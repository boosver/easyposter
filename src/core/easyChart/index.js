
class easyChart {
    constructor(options) {
        this.canvasId = options.canvasId
        this.uCharts = options.uCharts;
        this.uChartsConfig = options.uChartsConfig;
        const defaultConfig  = {
            width:300,
            height:300
        }
        this.optionsConfig = options.config ? Object.assign(defaultConfig, options.config) : defaultConfig;

        this.uChartsInstance = {};
    }

    init() {

        return new Promise((resolve, reject)=>{
            this.uChartsInstance[this.canvasId] = new this.uCharts(this.uChartsConfig);

            this.uChartsInstance[this.canvasId].addEventListener('renderComplete', () => { //监控图表渲染完成
                resolve(true)
            })
        
        })


    }

    getuChartsInstance() {
        return this.uChartsInstance[this.canvasId]
    }
}

export default easyChart;