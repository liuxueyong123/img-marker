import Rect from './shape/Rect'
import { ShapeType, type AllShape } from './type'

class ImgMarker {
  /** 画布宽度 */
  CANVAS_WIDTH = 0
  /** 画布高度 */
  CANVAS_HEIGHT = 0
  /** 图片原始宽度 */
  IMAGE_ORIGIN_WIDTH = 0
  /** 图片原始高度 */
  IMAGE_ORIGIN_HEIGHT = 0
  /** 图片缩放宽度 */
  IMAGE_WIDTH = 0
  /** 图片缩放高度 */
  IMAGE_HEIGHT = 0
  /** 原点x */
  originX = 0
  /** 原点y */
  originY = 0

  /** 边线颜色 */
  strokeStyle = '#FFE729'
  /** 填充颜色 */
  fillStyle = 'rgba(255,231,41, 0.2)'
  /** 边线宽度 */
  lineWidth = 1
  /** 当前选中的标注边线颜色 */
  activeStrokeStyle = '#FFE729'
  /** 当前选中的标注填充颜色 */
  activeFillStyle = 'rgba(255,231,41, 0.2)'
  /** 控制点边线颜色 */
  ctrlStrokeStyle = '#000'
  /** 控制点填充颜色 */
  ctrlFillStyle = '#fff'
  /** 控制点半径 */
  ctrlRadius = 4

  canvas!: HTMLCanvasElement
  ctx!: CanvasRenderingContext2D

  /** 所有标注数据 */
  dataset: AllShape[] = []
  /** 背景图片 */
  image: HTMLImageElement = new Image()

  /**
     * @param el Valid CSS selector string, or DOM
     * @param src image src
     */
  constructor (el: HTMLCanvasElement | string, src?: string) {
    this.handleLoad = this.handleLoad.bind(this)

    const container = typeof el === 'string' ? document.querySelector(el) : el
    if (container instanceof HTMLCanvasElement) {
      this.canvas = container
      this.initSetting()
      this.initEvents()
      src && this.setImage(src)
    } else {
      console.warn('HTMLCanvasElement is required!')
    }
  }

  /**
     * 初始化配置
     */
  initSetting (): void {
    // const dpr = window.devicePixelRatio || 1
    const dpr = 1
    // this.canvas.style.userSelect = 'none'
    this.ctx = this.ctx || this.canvas.getContext('2d', { alpha: true })
    this.CANVAS_WIDTH = this.canvas.clientWidth
    this.CANVAS_HEIGHT = this.canvas.clientHeight
    this.canvas.width = this.CANVAS_WIDTH * dpr
    this.canvas.height = this.CANVAS_HEIGHT * dpr
    this.canvas.style.width = this.CANVAS_WIDTH + 'px'
    this.canvas.style.height = this.CANVAS_HEIGHT + 'px'
    this.ctx.scale(dpr, dpr)
  }

  /**
     * 初始化事件
     */
  initEvents (): void {
    this.image.addEventListener('load', this.handleLoad)
    // this.canvas.addEventListener('touchstart', this.handleMouseDown)
    // this.canvas.addEventListener('touchmove', this.handelMouseMove)
    // this.canvas.addEventListener('touchend', this.handelMouseUp)
    // this.canvas.addEventListener('mousedown', this.handleMouseDown)
    // this.canvas.addEventListener('mousemove', this.handelMouseMove)
    // this.canvas.addEventListener('mouseup', this.handelMouseUp)
    // this.canvas.addEventListener('contextmenu', this.handleContextmenu)
    // this.canvas.addEventListener('mousewheel', this.handleMousewheel)
    // this.canvas.addEventListener('dblclick', this.handelDblclick)
    // document.body.addEventListener('keyup', this.handelKeyup)
  }

  handleLoad (): void {
    this.IMAGE_ORIGIN_WIDTH = this.IMAGE_WIDTH = this.image.width
    this.IMAGE_ORIGIN_HEIGHT = this.IMAGE_HEIGHT = this.image.height
    this.fitZoom()
    this.update()
  }

  /**
     * 适配背景图
     */
  fitZoom (): void {
    const canvasAspectRate = this.CANVAS_WIDTH / this.CANVAS_HEIGHT
    const originalAspectRate = this.IMAGE_ORIGIN_WIDTH / this.IMAGE_ORIGIN_HEIGHT
    if (canvasAspectRate > originalAspectRate) {
      this.IMAGE_HEIGHT = this.CANVAS_HEIGHT
      this.IMAGE_WIDTH = this.CANVAS_HEIGHT * originalAspectRate
    } else {
      this.IMAGE_WIDTH = this.CANVAS_WIDTH
      this.IMAGE_HEIGHT = this.CANVAS_WIDTH / originalAspectRate
    }

    this.originX = (this.CANVAS_WIDTH - this.IMAGE_WIDTH) / 2
    this.originY = (this.CANVAS_HEIGHT - this.IMAGE_HEIGHT) / 2
  }

  /**
     * 设置数据
     * @param data Array
     */
  setData (data: AllShape[]): void {
    this.dataset = data.map((item, index) => {
      switch (item.type) {
        case ShapeType.rect:
          return new Rect(item, index)
        default:
          return new Rect(item, index)
      }
    })
    this.update()
  }

  /**
     * 更新画布
     */
  update (): void {
    this.ctx.save()
    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
    this.ctx.translate(this.originX, this.originY)
    for (let i = 0; i < this.dataset.length; i++) {
      const shape = this.dataset[i]
      switch (shape.type) {
        case ShapeType.rect:
          this.drawRect(shape)
          break
        default:
          break
      }
    }
    // if ([1, 2, 4, 5].includes(this.activeShape.type) && !this.activeShape.hide) {
    //   this.drawCtrlList(this.activeShape)
    // }
    this.ctx.restore()
  }

  /**
     * 绘制矩形
     * @param shape 标注实例
     * @returns
     */
  drawRect (shape: Rect): void {
    if (shape.coor.length !== 2) return
    const { strokeStyle, fillStyle, active, creating, coor, lineWidth } = shape
    const [[x0, y0], [x1, y1]] = coor
    this.ctx.save()
    this.ctx.lineWidth = lineWidth || this.lineWidth
    this.ctx.fillStyle = fillStyle || this.fillStyle
    this.ctx.strokeStyle = (active || creating) ? this.activeStrokeStyle : (strokeStyle || this.strokeStyle)
    const w = x1 - x0
    const h = y1 - y0
    if (!creating) this.ctx.fillRect(x0, y0, w, h)
    this.ctx.strokeRect(x0, y0, w, h)
    this.ctx.restore()
  }

  /**
     * 添加/切换图片
     * @param url 图片链接
     */
  setImage (url: string): void {
    this.image.src = url
    this.canvas.style.backgroundImage = `url("${url}")`
    this.canvas.style.backgroundSize = 'contain'
    this.canvas.style.backgroundRepeat = 'no-repeat'
    this.canvas.style.backgroundPosition = 'center center'
  }
}

export default ImgMarker
