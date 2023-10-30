import Rect from './shape/Rect'
import { isMobile } from './tools'
import { ShapeType, type AllShape, type Point, MarkMode } from './type'

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

  /** 边线颜色 */
  strokeStyle = '#FFE729'
  /** 填充颜色 */
  fillStyle = 'rgba(255,231,41, 0.2)'
  /** 边线宽度 */
  lineWidth = 4
  /** 当前选中的标注边线颜色 */
  activeStrokeStyle = '#FFE729'
  /** 当前选中的标注填充颜色 */
  activeFillStyle = 'rgba(255,231,41, 0.2)'
  /** 控制点边线颜色 */
  ctrlStrokeStyle = '#505E72'
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
  /** 当前行为 */
  currentMode = MarkMode.edit
  /** 控制点索引 */
  ctrlIndex = -1
  /** 当前鼠标位置 */
  currentMousePoint: Point = [0, 0]

  /** 当前当前选中的标注 */
  get activeShape (): AllShape | null {
    return this.dataset.find(x => x.active) ?? null
  }

  /**
     * @param el Valid CSS selector string, or DOM
     * @param src image src
     */
  constructor (el: HTMLCanvasElement | string, src?: string) {
    this.handleLoad = this.handleLoad.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handelMouseMove = this.handelMouseMove.bind(this)
    this.handelMouseUp = this.handelMouseUp.bind(this)

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
    this.canvas.addEventListener('mousedown', this.handleMouseDown)
    this.canvas.addEventListener('mousemove', this.handelMouseMove)
    this.canvas.addEventListener('mouseup', this.handelMouseUp)
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

  handleMouseDown (e: MouseEvent | TouchEvent) {
    e.stopPropagation()
    const { mouseX, mouseY, mouseCX, mouseCY } = this.mergeEvent(e)
    const mouse: Point = isMobile() && (e as TouchEvent).touches.length === 2 ? [mouseCX, mouseCY] : [mouseX, mouseY]
    if ((!isMobile() && (e as MouseEvent).buttons === 1) || (isMobile() && (e as TouchEvent).touches.length === 1)) { // 鼠标左键
      this.currentMousePoint = mouse
      const ctrls = this.activeShape?.ctrlsData ?? []
      this.ctrlIndex = ctrls.findIndex((coor: Point) => this.isPointInCircle(mouse, coor, this.ctrlRadius))
      if (this.ctrlIndex > -1) { // 点击到控制点
        this.changeCursor('nwse-resize')
        return
      }

      if (this.currentMode > MarkMode.edit) { // 开始创建
        let newShape
        const curPoint: Point = [mouseX, mouseY]
        switch (this.currentMode) {
          case MarkMode.rect:
            newShape = new Rect({ coor: [curPoint, curPoint] }, this.dataset.length)
            newShape.creating = true
            break
          default:
            newShape = new Rect({ coor: [curPoint, curPoint] }, this.dataset.length)
            newShape.creating = true
            break
        }
        this.dataset.forEach((sp) => { sp.active = false })
        newShape.active = true
        this.dataset.push(newShape)
      } else { // 是否点击到形状
        const { isOnShape, index, shape } = this.isHitOnShape(mouse)
        if (!isOnShape) {
          if (this.activeShape) {
            this.activeShape.active = false
          }
          this.dataset.sort((a, b) => a.index - b.index)
        } else {
          this.changeCursor('move')
          this.dataset.map((item, i) => item.active = i === index)
          shape.dragging = true
          this.dataset.splice(index, 1)
          this.dataset.push(shape)
        }
      }

      this.update()
    }
  }

  handelMouseMove (e: MouseEvent | TouchEvent) {
    e.stopPropagation()
    const { mouseX, mouseY, mouseCX, mouseCY } = this.mergeEvent(e)
    const mouse: Point = isMobile() && (e as TouchEvent).touches.length === 2 ? [mouseCX, mouseCY] : [mouseX, mouseY]
    const { isOnShape, shape } = this.isHitOnShape(mouse)
    if (this.ctrlIndex > -1) {
      this.changeCursor('nwse-resize')
    } else if (this.currentMode > MarkMode.edit) {
      this.changeCursor('copy')
    } else if (!isOnShape) {
      this.changeCursor('default')
    } else {
      this.changeCursor(shape.active ? 'move' : 'pointer')
    }

    if (((!isMobile() && (e as MouseEvent).buttons === 1) || (isMobile() && (e as TouchEvent).touches.length === 1)) && this.activeShape?.type) {
      if (this.ctrlIndex > -1) { // 点击到控制点
        if (this.activeShape.type === ShapeType.rect) {
          const [[x0, y0], [x1, y1]] = this.activeShape.coor
          let coor: Point[] = []
          switch (this.ctrlIndex) {
            case 0:
              coor = [[mouseX, mouseY], [x1, y1]]
              break
            case 1:
              coor = [[x0, mouseY], [x1, y1]]
              break
            case 2:
              coor = [[x0, mouseY], [mouseX, y1]]
              break
            case 3:
              coor = [[x0, y0], [mouseX, y1]]
              break
            case 4:
              coor = [[x0, y0], [mouseX, mouseY]]
              break
            case 5:
              coor = [[x0, y0], [x1, mouseY]]
              break
            case 6:
              coor = [[mouseX, y0], [x1, mouseY]]
              break
            case 7:
              coor = [[mouseX, y0], [x1, y1]]
              break
            default:
              break
          }
          const [[a0, b0], [a1, b1]] = coor
          if (a1 - a0 >= Rect.MIN_WIDTH && b1 - b0 >= Rect.MIN_HEIGHT) {
            this.activeShape.coor = [[a0, b0], [a1, b1]]
          }
        }
      } else if (this.activeShape.dragging) { // 拖拽
        const coor = []
        let noLimit = true
        for (let i = 0; i < this.activeShape.coor.length; i++) {
          const [initialX, initialY] = this.activeShape.coor[i]
          const x = initialX + mouseX - this.currentMousePoint[0]
          const y = initialY + mouseY - this.currentMousePoint[1]
          if (x < 0 || x > this.CANVAS_WIDTH || y < 0 || y > this.CANVAS_HEIGHT) {
            noLimit = false
          }
          coor.push([x, y])
        }

        if (noLimit) this.activeShape.coor = coor
      } else if (this.activeShape.creating) {
        this.changeCursor('nwse-resize')
        // 创建矩形
        if (this.activeShape.type === ShapeType.rect) {
          this.activeShape.coor.splice(1, 1, [mouseX, mouseY])
        }
      }
      this.currentMousePoint = mouse
      this.update()
    }
  }

  handelMouseUp (e: MouseEvent | TouchEvent) {
    e.stopPropagation()
    this.ctrlIndex = -1
    if (this.activeShape?.type) {
      this.activeShape.dragging = false
      if (this.activeShape.creating) {
        if (this.activeShape.type === ShapeType.rect) {
          const [[x0, y0], [x1, y1]] = this.activeShape.coor
          if (Math.abs(x0 - x1) < Rect.MIN_WIDTH || Math.abs(y0 - y1) < Rect.MIN_HEIGHT) {
            this.dataset.pop()
          } else {
            this.activeShape.coor = [[Math.min(x0, x1), Math.min(y0, y1)], [Math.max(x0, x1), Math.max(y0, y1)]]
            this.activeShape.creating = false
          }
        }
        this.update()
      }
    }
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
    this.drawShapes()
    if (this.activeShape && [ShapeType.rect].includes(this.activeShape.type)) {
      this.drawCtrlList(this.activeShape)
    }
    this.ctx.restore()
  }

  /**
     * 绘制标记的图形到 canvas 上
     * @returns
     */
  drawShapes () {
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
  }

  /**
     * 绘制底图到 canvas 上
     * @returns
     */
  drawImg () {
    const x = (this.CANVAS_WIDTH - this.IMAGE_WIDTH) / 2
    const y = (this.CANVAS_HEIGHT - this.IMAGE_HEIGHT) / 2
    this.ctx.drawImage(this.image, x, y, this.IMAGE_WIDTH, this.IMAGE_HEIGHT)
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
    this.ctx.fillRect(x0, y0, w, h)
    this.ctx.strokeRect(x0, y0, w, h)
    this.ctx.restore()
  }

  /**
     * 绘制控制点列表
     * @param shape 标注实例
     */
  drawCtrlList (shape: AllShape) {
    shape.ctrlsData.forEach((point, i) => {
      this.drawCtrl(point)
    })
  }

  /**
     * 绘制控制点
     * @param point 坐标
     */
  drawCtrl (point: Point) {
    const [x, y] = point
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.fillStyle = this.ctrlFillStyle
    this.ctx.strokeStyle = this.ctrlStrokeStyle
    this.ctx.arc(x, y, this.ctrlRadius, 0, 2 * Math.PI, true)
    this.ctx.fill()
    this.ctx.arc(x, y, this.ctrlRadius, 0, 2 * Math.PI, true)
    this.ctx.stroke()
    this.ctx.restore()
  }

  /**
     * 添加/切换图片
     * @param url 图片链接
     */
  setImage (url: string): void {
    this.image.src = url
    this.image.crossOrigin = 'anonymous'
    this.canvas.style.backgroundImage = `url("${url}")`
    this.canvas.style.backgroundSize = 'contain'
    this.canvas.style.backgroundRepeat = 'no-repeat'
    this.canvas.style.backgroundPosition = 'center center'
  }

  /**
     * 添加/切换图片
     * @param url 图片链接
     */
  exportImg () {
    this.ctx.save()
    this.ctx.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT)
    this.drawImg()
    this.drawShapes()
    this.ctx.restore()
    const result = this.canvas.toDataURL(
      'image/jpeg',
      1
    )
    return result
  }

  /**
     * 合成事件
     * @param e
     * @returns
     */
  mergeEvent (e: TouchEvent | MouseEvent) {
    let mouseX = 0
    let mouseY = 0
    let mouseCX = 0
    let mouseCY = 0
    if (isMobile()) {
      const { clientX, clientY } = (e as TouchEvent).touches[0]
      const target = e.target as HTMLCanvasElement
      const { left, top } = target.getBoundingClientRect()
      mouseX = Math.round(clientX - left)
      mouseY = Math.round(clientY - top)
      if ((e as TouchEvent).touches.length === 2) {
        const { clientX: clientX1 = 0, clientY: clientY1 = 0 } = (e as TouchEvent).touches[1] || {}
        mouseCX = Math.round(Math.abs((clientX1 - clientX) / 2 + clientX) - left)
        mouseCY = Math.round(Math.abs((clientY1 - clientY) / 2 + clientY) - top)
      }
    } else {
      mouseX = (e as MouseEvent).offsetX
      mouseY = (e as MouseEvent).offsetY
    }
    return { ...e, mouseX, mouseY, mouseCX, mouseCY }
  }

  /**
     * 判断是否在圆内
     * @param point 坐标
     * @param center 圆心
     * @param r 半径
     * @param needScale 是否为圆形点击检测
     * @returns 布尔值
     */
  isPointInCircle (point: Point, center: Point, r: number): boolean {
    const [x, y] = point
    const [x0, y0] = center
    const distance = Math.sqrt((x0 - x) ** 2 + (y0 - y) ** 2)
    return distance <= r
  }

  /**
     * 判断是否在矩形内
     * @param point 坐标
     * @param coor 区域坐标
     * @returns 布尔值
     */
  isPointInRect (point: Point, coor: Point[]): boolean {
    const [x, y] = point
    const [[x0, y0], [x1, y1]] = coor
    return x0 <= x &&
            x <= x1 &&
            y0 <= y &&
            y <= y1
  }

  /**
     * 判断是否在标注实例上
     * @param mousePoint 点击位置
     * @returns
     */
  isHitOnShape (mousePoint: Point):
  { isOnShape: true, shape: AllShape, index: number } | { isOnShape: false, index: -1, shape: null } {
    for (let i = this.dataset.length - 1; i >= 0; i--) {
      const shape = this.dataset[i]
      if (
        (shape.type === ShapeType.rect && this.isPointInRect(mousePoint, (shape).coor))
      ) {
        return {
          isOnShape: true,
          index: i,
          shape
        }
      }
    }
    return {
      isOnShape: false,
      index: -1,
      shape: null
    }
  }

  /**
     * 更改当前鼠标样式
     * @param cursor 鼠标样式
     * @returns
     */
  changeCursor (cursor: string) {
    this.canvas.style.cursor = cursor
  }
}

export default ImgMarker
