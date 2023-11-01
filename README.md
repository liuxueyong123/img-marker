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
import ImageMarker, { MarkMode, EventType } from 'img-marker'

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

// 图片加载完成触发回掉函数
imgMarker.on(EventType.Load, () => {
  console.log('Image loaded')
});
// 添加标注触发回掉函数
imgMarker.on(EventType.Add, (shape) => {
  console.log('added shape', shape)
  // 添加一次标注后将当前行为模式设置为：图形编辑模式，对标注进行移动和放缩
  imgMarker.setMode(MarkMode.edit);
});
// 选中标注触发回掉函数
imgMarker.on(EventType.Select, (shape) => {
  console.log('selected shape', shape)
});

// 将标注结果导出为图片
// const img = imgMarker.exportImg("image/jpeg", 0.9)
// 销毁实例
// imgMarker.destroy()
```

## API

- 待补充...
