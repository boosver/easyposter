

# easyposter

#### 介绍
一个基于uniapp的canvas绘制海报库，让绘海报更简单更美好

#### 参考声明
部分代码基础参考了小凡同学的代码特此感谢(已获得本人授权)

#### 演示地址

https://github.com/boosver/easyPosterDemo

#### 安装教程

```bash
$ npm install easyposter
```
```bash
$ pnpm add easyposter
```
```bash
$ yarn add easyposter
```
#### 使用说明
```bash
import easyposter from 'easyposter'

const ctx = uni.createCanvasContext('canvasId')

const ep = new easyposter({
    ctx
})
```

# API参考

#### easyRectangle

向目标画布绘制一个矩形

```javascript
ep.easyRectangle(0,0,width,height,20,"#ddd222");
```
参数说明
| 参数名    | 类型   | 是否必填 | 说明                  |
| --------- | ------ | -------- | --------------------- |
| x         | Number | 是       | 绘制目标画布的x轴坐标 |
| y         | Number | 是       | 绘制目标画布的y轴坐标 |
| width     | Number | 是       | 宽度                  |
| height    | Number | 是       | 高度                  |
| radius    | Number | 是       | 绘制的矩形圆角        |
| fillColor | String | 是       | 背景颜色              |

#### easyText

向目标画布绘制一段文字

```javascript
ep.easyText('easyPoster真好用', 0, 0, 12, '#FFFFFFF',"'PingFang SC',tahoma,arial,'helvetica neue'");
```
参数说明
| 参数名    | 类型   | 是否必填 | 默认值 | 说明                  |
| :-------: | :----: | :------: | :-------------------: | :-------------------: |
| str         | String | 是       | 无      | 绘制的目标文字 |
| x        | Number | 是       | 无      | 绘制目标画布的x轴坐标 |
| y     | Number | 是       | 无    | 绘制目标画布的y轴坐标      |
| fontSize | Number | 是       | 无    | 文字大小            |
| fontColor | String | 是       | 无    | 文字颜色    |
| family | String | 否       | 'PingFang SC',tahoma,arial,'helvetica neue','hiragino sans gb','microsoft yahei',sans-serif | 文字字体            |

#### easyGetImageInfo(Promise)

获取图片信息(支持uniapp)

```javascript
ep.easyGetImageInfo('http://www.baidu.com');
```

参数说明
| 参数名    | 类型   | 是否必填 | 默认值 | 说明                  |
| :-------: | :----: | :------: | :-------------------: | :-------------------: |
| image      | String | 是       | 无      | 需要获取的图片的网络地址或者图片的base64字符串(此api基于uniapp的获取图片api所以目前只支持uniapp环境) |

#### easyDrawImgCover

绘制图片不变形

```javascript
ep.easyDrawImgCover(path, x, y, width, height);
```

参数说明
| 参数名    | 类型   | 是否必填 | 默认值 | 说明                  |
| :-------: | :----: | :------: | :-------------------: | :-------------------: |
| path      | Object | 是       | 无      | 获取到图片信息配合 easyGetImageInfo使用 |
| x        | Number | 是       | 无      | 绘制目标画布的x轴坐标 |
| y     | Number | 是       | 无    | 绘制目标画布的y轴坐标      |
| width     | Number | 是   | 无   | 宽度                  |
| height    | Number | 是    |  无 | 高度                  |

#### easyDrawCircular

绘制圆形头像

```javascript
ep.easyDrawCircular(url, x, y, width, height);
```

参数说明
| 参数名    | 类型   | 是否必填 | 默认值 | 说明                  |
| :-------: | :----: | :------: | :-------------------: | :-------------------: |
| url      | Object | 是       | 无      | 获取到图片信息配合 easyGetImageInfo使用 |
| x        | Number | 是       | 无      | 绘制目标画布的x轴坐标 |
| y     | Number | 是       | 无    | 绘制目标画布的y轴坐标      |
| width     | Number | 是   | 无   | 宽度                  |
| height    | Number | 是    |  无 | 高度                  |

#### easyDrawChart(Promise)

绘制图标到海报中

```javascript
ep.easyDrawCircular(uCharts, 'line', uChartsConfig, {
    x: 10,
    y: 10,
    width: 300,
    height: 181
});
```

参数说明
| 参数名    | 类型   | 是否必填 | 默认值 | 说明                  |
| :-------: | :----: | :------: | :-------------------: | :-------------------: |
| uCharts      | Object | 是       | 无      | uCharts的对象|
| uChartsCanvasId        | Number | 是       | 无      | 容纳uCharts的canvas的id |
| uChartsConfig     | Object | 是       | 无    | uCharts的图表配置项，要求全部配置全部传入      |
| easyConfig     | Object | 是   | 无   | 绘制到海报中的相关配置               |
| easyConfig.x    | Number | 是    |  0 | 绘制到海报中的x轴坐标             |
| easyConfig.y    | Number | 是    |  0 | 绘制到海报中的y轴坐标             |
| easyConfig.width    | Number | 是    |  0 | 绘制到海报中的宽度             |
| easyConfig.height    | Number | 是    |  0 | 绘制到海报中的高度            |


#### easyDrawSaveImg(Promise)

绘制canvas并且生成一个图片返回

```javascript
ep.easyDrawSaveImg({
    canvasId: 'poster',
    destWidth: 340,
    destHeight: 501,
}).then((canvasImg) => {
    
})
```

参数说明
| 参数名    | 类型   | 是否必填 | 默认值 | 说明                  |
| :-------: | :----: | :------: | :-------------------: | :-------------------: |
| options      | Object | 是       | 无      | 参数参考uniapp api https://uniapp.dcloud.io/api/canvas/canvasToTempFilePath.html |


# 关于绘制图表的重要提示

首先为了保证库的小巧精干，并且市面上已经有了很多靠谱成熟的解决方案所以easyposter直接拿了一个开箱即用的解决方案来进行一些封装


首先我们用的是uCharts解决方案

```javascript
npm i @qiun/ucharts
```

uCharts对于uniapp跨端兼容性比较好，所以选用了这个方案
况且一般来说对于海报只会使用简单的图表不会用很多复杂的图表
所以uCharts的提供的图表已经满足很多日常需求。
如果你的项目中绘制海报需求要绘制图表的话，那么你就在你的项目中安装uCharts
否则则不需要安装，uCharts对于easyposter这个库来说不是必要的

具体使用请参考以下代码
```javascript
const canvasWidth = 300;
const canvasHehgit = 181
const lineCtx = uni.createCanvasContext('line')
let uChartsConfig = {
	type: "area",
	context: lineCtx,
	width: canvasWidth,
	height: canvasHehgit,
	categories: ["2016", "2017", "2018", "2019", '2020'],
	series: [
		{
			name: "成交量A",
			data: [1, 5, 23, 10, 29],
			legendText: ''
		},

	],
					
	animation: true,
	background: "#FFFFFF",
	color: ["#FA9371", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452","#9A60B4", "#ea7ccc"],
	padding: [15, 10, 0, 15],
	legend: {
		show: false
	},
	xAxis: {
		disableGrid: true
	},
	yAxis: {
		gridType: "dash",
		dashLength: 2
	},
	extra: {
		area: {
			type: "curve",
			opacity: 1,
			addLine: true,
			width: 2,
			gradient: true
		}
	}
}

ep.easyDrawChart(uCharts, 'line', uChartsConfig, {
	x: 10,
	y: 10,
	width: canvasWidth,
	height: canvasHehgit
}).then(() => {
	ep.easyDrawSaveImg({
		canvasId: 'poster',
		destWidth: 340,
		destHeight: 501,
	}).then((res) => {
		this.canvasImg = res;
	})
})
    
```

要注意的是如果想保证绘制出来的图表和添加到海报中的图表不变形，那么canvas的宽度和高度要与添加的图表保持一致

其余的图表配置项请参考uCharts官方文档

https://www.ucharts.cn/v2/#/


