# Img Marker

一个基于 canvas 的极简轻量级图片标注库，支持多种图形标注 🚀🚀🚀

使用示例 👉 [Demo](https://lxy520.top/demo/img-marker.html)
![图例](https://web-cdn.agora.io/doc-shengwang/img/changelog/202310301605373.png)

## 安装

- 使用 cdn

```js
<script src="https://npm.onmicrosoft.cn/img-marker@^0/lib/index.umd.js"></script>
```

- 使用 npm

```sh
npm install img-marker
```

- 使用 yarn

```sh
yarn add img-marker
```

- 使用 pnpm

```sh
pnpm add img-marker
```

## 使用

### 导入包

<!-- - CommonJS 导入

```js
const { SensitiveWordTool } = require('img-marker')
``` -->

- ESModule 导入

```js
import ImageMarker from 'img-marker'
```

### 进行图片标注

- 基础用法

```html
<canvas id="myCanvas"></canvas>
```

```ts
import ImageMarker, { MarkMode } from 'img-marker'

// 通过 dom 或 css selector 初始化 imgMarker 实例
const imgMarker = new ImgMarker("#myCanvas", "https://lxy520.top/myImage/202310301200291.png")
// 设置初始的默认标注
imgMarker.setData([
  {
    coor: [[12, 40], [640, 100]],
    type: 1
  },
])
// 设置当前行为模式为：点击创建矩形标注
imgMarker.setMode(MarkMode.rect)
// 设置当前行为模式为：图形编辑模式，对标注进行移动和放缩
imgMarker.setMode(MarkMode.edit)

// 将标注结果导出为图片
const img = imgMarker.exportImg("image/jpeg", 0.9)
```

## API

- 待补充...
