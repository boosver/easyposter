/**
 * 绘制矩形
 * 参数：cxt、x坐标、y坐标、宽度、高度、圆角、颜色
 */
function fillRoundRect(cxt, x, y, width, height, radius, fillColor) {

    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) {
        return false;
    }
    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    cxt.fillStyle = fillColor || '#000'; //若是给定了值就用给定的值否则给予默认值
    cxt.fill();
    cxt.restore();
}
// 绘制矩形各个边过程
function drawRoundRectPath(cxt, width, height, radius) {
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
    //矩形下边线
    cxt.lineTo(radius, height);
    //左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
    //矩形左边线
    cxt.lineTo(0, radius);
    //左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius, radius, radius, Math.PI, (Math.PI * 3) / 2);
    //上边线
    cxt.lineTo(width - radius, 0);
    //右上角圆弧
    cxt.arc(width - radius, radius, radius, (Math.PI * 3) / 2, Math.PI * 2);
    //右边线
    cxt.lineTo(width, height - radius);
    cxt.closePath();
}
/**
 * 绘制矩形边框
 * 参数：cxt、x坐标、y坐标、宽度、高度、圆角、border颜色
 */
function roundRectBorder(cxt, x, y, w, h, r, borderWidth) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    cxt.beginPath();
    cxt.moveTo(x + r, y);
    cxt.arcTo(x + w, y, x + w, y + h, r);
    cxt.arcTo(x + w, y + h, x, y + h, r);
    cxt.arcTo(x, y + h, x, y, r);
    cxt.arcTo(x, y, x + w, y, r);
    cxt.closePath();
    cxt.lineWidth = borderWidth
}

/**
 * 绘制圆形头像
 * 参数：cxt、图标路径path、x坐标、y坐标、宽度、高度
 */
function drawCircular(ctx, url, x, y, width, height) {
    //画圆形头像
    var avatarurl_width = width;
    var avatarurl_heigth = height;
    var avatarurl_x = x;
    var avatarurl_y = y;
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(url, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);
    ctx.restore();
}

/*
 * 绘制图片cover
 * t:cxt;
 * e:图片属性（通过getImageInfo获取）
 * s:x坐标
 * o:y坐标
 * i:绘制图片宽度
 * a:绘制图片高度
 */
function drawImgCover(t, e, s, o, i, a) {

    if (e.width / e.height >= i / a) {
        var r = e.height,
            n = Math.ceil(i / a * r);
        t.drawImage(e.path, (e.width - n) / 2, 0, n, e.height, s, o, i, a)
    } else {
        var c = e.width,
            l = Math.ceil(a / i * c);
        t.drawImage(e.path, 0, (e.height - l) / 2, e.width, l, s, o, i, a)
    }
}

/*
 * 文本自定义换行 -- 只适用于中文（淘汰）
 * family = " 'PingFang SC',tahoma,arial,'helvetica neue','hiragino sans gb','microsoft yahei',sans-serif";
 * var options = {
                font:"22px" + family,  字体大小
                ctx:ctx,          uni.createCanvasContext('firstCanvas')
                word:"文字",      文字
                maxWidth:750,     最大宽度
                maxLine:2,        最大行数
                x:100,            x坐标
                y:100,            y坐标
                l_h:40            行高
            }
 * callback 自定义函数
 */
// function dealWords(options, callback) {
//     options.ctx.font = options.font; //设置字体
//     callback && callback();
//     var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth); //实际总共能分多少行
//     var count = allRow >= options.maxLine ? options.maxLine : allRow; //实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数

//     var endPos = 0; //当前字符串的截断点
//     for (var j = 0; j < count; j++) {
//         var nowStr = options.word.slice(endPos); //当前剩余的字符串
//         var rowWid = 0; //每一行当前宽度    
//         if (options.ctx.measureText(nowStr).width > options.maxWidth) { //如果当前的字符串宽度大于最大宽度，然后开始截取
//             for (var m = 0; m < nowStr.length; m++) {
//                 rowWid += options.ctx.measureText(nowStr[m]).width; //当前字符串总宽度
//                 if (rowWid > options.maxWidth) {
//                     if (j === options.maxLine - 1) { //如果是最后一行
//                         options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, options.y + (j + 1) * options.l_h); //(j+1)*18这是每一行的高度        
//                     } else {
//                         options.ctx.fillText(nowStr.slice(0, m), options.x, options.y + (j + 1) * options.l_h);
//                     }
//                     endPos += m; //下次截断点
//                     break;
//                 }
//             }
//         } else { //如果当前的字符串宽度小于最大宽度就直接输出
//             options.ctx.fillText(nowStr.slice(0), options.x, options.y + (j + 1) * options.l_h);
//         }
//     }
// }

/*
 * 文本自定义换行---已适配英文不截断换行（2022.7.22更新）
 * family = " 'PingFang SC',tahoma,arial,'helvetica neue','hiragino sans gb','microsoft yahei',sans-serif";
 * var options = {
                font:"22px" + family,  字体大小
                ctx:ctx,          uni.createCanvasContext('firstCanvas')
                word:"文字",      文字
                maxWidth:750,     最大宽度
                maxLine:2,        最大行数
                x:100,            x坐标
                y:100,            y坐标
                l_h:40,           行高
                textCenter:false, 是否居中
                cvsW:cvsW,        画布总宽--用于计算文字居中
            }
 * callback 自定义函数
 */
function dealWords(options, callback) {
    options.ctx.font = options.font; //设置字体
    callback && callback();
    var allRow = getLineNum(options.ctx, options.word, options.maxWidth)
    // var allRow = Math.ceil(options.ctx.measureText(options.word).width / options.maxWidth)+1; //实际总共能分多少行--默认多加一行，预留有英文截断
    var count = allRow >= options.maxLine ? options.maxLine : allRow; //实际能分多少行与设置的最大显示行数比，谁小就用谁做循环次数
    var endPos = 0; //当前字符串的截断点
    for (var j = 0; j < count; j++) {
        if (endPos >= options.word.length) {
            break;
        }
        var nowStr = options.word.slice(endPos); //当前剩余的字符串
        var rowWid = 0; //每一行当前宽度    
        if (options.ctx.measureText(nowStr).width > options.maxWidth) { //如果当前的字符串宽度大于最大宽度，然后开始截取
            for (var m = 0; m < nowStr.length; m++) {
                rowWid += options.ctx.measureText(nowStr[m]).width; //当前字符串总宽度
                if (rowWid > options.maxWidth) {
                    endPos += m; //下次截断点

                    var isBlock = false //是否被截断了
                    var num = 1 //前几位数是空'',判断从这个点换行
                    // 判断最后一个是否字母--判断是否截断了英文
                    var jy = /^[a-zA-Z]*$/
                    if (jy.test(nowStr[m - 1])) {
                        console.log(m - 1, nowStr[m - 1], '最后一个是字母')
                        for (var n = 1; n < (m - 1); n++) {
                            if (!jy.test(nowStr[m - 1 - n])) {
                                console.log(m - 1 - n, nowStr[m - 1 - n], num, endPos, '这个位置是空字符')
                                endPos = endPos - num
                                isBlock = true
                                break;
                            }
                            num++
                        }
                    }
                    if (j === options.maxLine - 1) { //如果是最后一行
                        options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.textCenter ? (options.cvsW - options.ctx.measureText(nowStr.slice(0, m - 1)).width) / 2 : options.x, options.y + (j + 1) * options.l_h); //(j+1)*18这是每一行的高度 
                    } else {
                        options.ctx.fillText(nowStr.slice(0, isBlock ? (m - num) : m), options.textCenter ? (options.cvsW - options.ctx.measureText(nowStr.slice(0, isBlock ? (m - num) : m)).width) / 2 : options.x, options.y + (j + 1) * options.l_h);
                    }
                    break;
                }
            }
        } else { //如果当前的字符串宽度小于最大宽度就直接输出
            options.ctx.fillText(nowStr.slice(0), options.textCenter ? (options.cvsW - options.ctx.measureText(nowStr.slice(0)).width) / 2 : options.x, options.y + (j + 1) * options.l_h);
        }
    }
}

/*
 * 计算文字有几行--针对英文换行不截断的计算行数
 * ctx:cxt;
 * str:文案内容
 * maxWidth:文字最大宽度
 */
function getLineNum(ctx, str, maxWidth) {
    var allRow = Math.ceil(ctx.measureText(str).width / maxWidth) + 1; //实际总共能分多少行--默认多加一行，预留有英文截断
    var endPos = 0; //当前字符串的截断点
    var lineNum = 0 //行数
    for (var j = 0; j < allRow; j++) {
        var nowStr = str.slice(endPos); //当前剩余的字符串
        var rowWid = 0; //每一行当前宽度    
        if (ctx.measureText(nowStr).width > maxWidth) { //如果当前的字符串宽度大于最大宽度，然后开始截取
            for (var m = 0; m < nowStr.length; m++) {
                rowWid += ctx.measureText(nowStr[m]).width; //当前字符串总宽度
                if (rowWid > maxWidth) {
                    endPos += m; //下次截断点

                    var isBlock = false //是否被截断了
                    var num = 1 //前几位数是空'',判断从这个点换行
                    // 判断最后一个是否字母--判断是否截断了英文
                    var jy = /^[a-zA-Z]*$/
                    if (jy.test(nowStr[m - 1])) {
                        console.log(m - 1, nowStr[m - 1], '最后一个是字母')
                        for (var n = 1; n < (m - 1); n++) {
                            if (!jy.test(nowStr[m - 1 - n])) {
                                console.log(m - 1 - n, nowStr[m - 1 - n], num, endPos, '这个位置是空字符')
                                endPos = endPos - num
                                isBlock = true
                                break;
                            }
                            num++
                        }
                    }
                    break;
                }
            }
        } else {
            lineNum = j + 1
            console.log(nowStr.slice(0), lineNum, j, '最后一行')
            break;
        }
    }
    console.log(lineNum, '总行数')
    return lineNum
}


/*
 * 绘制圆角按钮
 * ctx:createCanvasContext
 * color:背景颜色;
 * x:x坐标
 * y:y坐标
 * width:宽
 * height:高
 * radius:圆角
 * text:文字
 * fontColor:文字颜色
 * textAlign: left/center/right
 */
function drawButton(ctx, color, x, y, width, height, radius, text, fontColor, textAlign) {
    //分为4条直线4个圆角绘制
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, Math.PI * 3 / 2, Math.PI * 2);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, Math.PI, Math.PI / 2);
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI);
    ctx.lineTo(x, y + radius);
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = fontColor;
    // ctx.font = 'normal bold 12px sans-serif';
    ctx.setTextAlign(textAlign)
    ctx.textBaseline = "middle";
    ctx.fillText(text, x + width / 2, y + height / 2);
}

export default {
    fillRoundRect: fillRoundRect, //绘制矩形
    roundRectBorder: roundRectBorder,//绘制矩形+边框
    drawCircular: drawCircular, //绘制圆形头像
    drawImgCover: drawImgCover, //绘制图片cover
    dealWords: dealWords, //文本自定义换行
    drawButton: drawButton, //绘制圆角按钮
    getLineNum: getLineNum, //计算内容行数
}