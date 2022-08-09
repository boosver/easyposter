

# easyposter

#### 介绍
一个基于uniapp的canvas绘制海报库，让绘海报更简单更美好

#### 参考声明
部分代码基础参考了小凡同学的代码特此感谢(已获得本人授权)

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
ep.fillRoundRect(0,0,width,height,20,"#ddd222");
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

#### easyGetImageInfo

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
