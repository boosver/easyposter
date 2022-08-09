import _canvas from './uniapp/index'
import easyChart from './easyChart';
class EasyPoster {

    constructor(options) {
        this.ctx = options.ctx;
    }
    /**
     * 绘制一个矩形
     * @param {number} x         @x轴
     * @param {number} y         @y轴  
     * @param {number} width     @宽度
     * @param {number} height    @高度
     * @param {number} radius    @圆角弧度
     * @param {string} fillColor @背景颜色 
     */
    easyRectangle(x, y, width, height, radius, fillColor) {

        const ctx = this.ctx;

        _canvas.fillRoundRect(ctx, x, y, width, height, radius, fillColor);
    }
    /**
     * 绘制文字
     * @param {string} str         @文字内容
     * @param {number} x           @x轴  
     * @param {number} y           @y轴
     * @param {number} fontSize    @文字大小
     * @param {string} fontColor   @文字颜色
     * @param {string} family      @字体
     */
    easyText(str, x, y, fontSize, fontColor, family) {
        const ctx = this.ctx
        
        if (!family) {
            family = " 'PingFang SC',tahoma,arial,'helvetica neue','hiragino sans gb','microsoft yahei',sans-serif";
        }else {
            family = `  ${family}`;
        }

        ctx.restore();
        ctx.setFillStyle(fontColor)

        ctx.font = fontSize + 'px' + family
        ctx.fillText(str, x, y)
    }

    /**
     * 获取图片
     * Promise
     * @param {string} image @图片地址
     * @returns 
     */
    easyGetImageInfo(image) {
        return new Promise((req, rj) => {
            // #ifndef APP-PLUS
            uni.getImageInfo({
                src: image,
                success: function (res) {
                    req(res)
                },
                fail: function (err) {
                    rj(err)
                }
            });
            // #endif
            // #ifdef APP-PLUS
            if (uni.getSystemInfoSync().platform == 'ios') {
                uni.downloadFile({
                    url: image,
                    success: (res) => {
                        res.path = res.tempFilePath
                        req(res)
                    },
                    fail: (err) => {
                        rj(err)
                    }
                })
            } else {
                uni.getImageInfo({
                    src: image,
                    success: function (res) {
                        req(res)
                    },
                    fail: function (err) {
                        rj(err)
                    }
                });
            }
            // #endif
        })
    }

    /**
     * 绘制图片cover
     * @param {Object} path   @图片属性(网络图不可用需要用easyGetImageInfo获取缓存图之后使用)
     * @param {number} x      @x轴
     * @param {number} y      @y轴
     * @param {number} width  @绘制的图片宽度
     * @param {number} height @绘制的图片高度 
     */
    easyDrawImgCover(path, x, y, width, height) {
        const ctx = this.ctx;

        ctx.save();
        _canvas.drawImgCover(ctx, path, x, y, width, height)

    }

    /**
     * 绘制圆形头像
     * @param {string} url      @图片地址
     * @param {number} x        @x轴
     * @param {number} y        @y轴
     * @param {number} width    @图片宽度
     * @param {number} height   @图片高度
     */
    easyDrawCircular(url, x, y, width, height) {

        const ctx = this.ctx;

        if (url.path) {
            url = url.path
        }
        _canvas.drawCircular(ctx, url, x, y, width, height);
    }
    /**
     * 绘制canvas并且生成一个图片返回
     * 参数参考uniapp api https://uniapp.dcloud.io/api/canvas/canvasToTempFilePath.html
     * @param {object} options 
     * @returns 
     */
    easyDrawSaveImg(options) {

        return new Promise((resolve, reject) => {
            const ctx = this.ctx;

            ctx.draw(true, (res) => {
                uni.canvasToTempFilePath({

                    ...options,
                    success(res) {
                        resolve(res.tempFilePath)
                    },
                    fail(err) {
                        reject(err)
                    }
                })
            })
        })

    }
    /**
     * 绘制图表方法
     * @param {Object} uCharts @uCharts对象 https://www.ucharts.cn/
     * @param {String} lineCtx @uCharts的canvasId
     * @param {Object} uChartsConfig @uCharts的图表配置项
     * @param {Object} easyConfig  @配置文件
     * {
     *  x: 10,  x轴
     *  y: 10,  y轴
     *  width: 300, 宽度
     *  height: 181 高度
     * }
     * @returns 
     */
    async easyDrawChart(uCharts, lineCtx, uChartsConfig, easyConfig) {
        let defaultOptions = {
            x: 0,
            y: 0,
            width: 300,
            height: 300
        }
        let options = easyConfig ? Object.assign(defaultOptions, easyConfig) : defaultOptions;

        return new Promise(async (resolve, reject) => {
            const ctx = this.ctx
            const lc = new easyChart({
                lineCtx,
                uCharts,
                uChartsConfig,
                config: {
                    width: options.width,
                    height: options.height
                }
            })
            const initRes = await lc.init()
            // console.log(initRes)
            if (!initRes) {
                reject(false)
            }

            const drawImg = await this.easyDrawSaveImg({
                canvasId: lineCtx,
                destWidth: options.width,
                destHeight: options.height,
            })

            const imgInfo = await this.easyGetImageInfo(drawImg);

            this.easyDrawImgCover(imgInfo, options.x, options.y, options.width, options.height);

            resolve(true)
        })




    }
}


export default EasyPoster;