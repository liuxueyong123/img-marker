import { createUuid } from '../tools'
import { ShapeType } from '../type'

interface ShapeProp {
  type: ShapeType
  [key: string]: any
}

export default class Shape {
  /** 坐标 */
  public coor: any[] = []
  /** 边线颜色 */
  public strokeStyle: string = '#FFE729'
  /** 填充颜色 */
  public fillStyle: string = 'rgba(255,231,41, 0.2)'
  /** 边线宽度 */
  public lineWidth: number = 4
  /** 默认为矩形 */
  public type: ShapeType = ShapeType.rect
  /** 当前是否处于活动状态 */
  public active: boolean = false
  /** 当前是否处于创建状态 */
  public creating: boolean = false
  /** 当前是否处于拖拽状态 */
  public dragging: boolean = false
  /** 索引 */
  public index: number
  /** 唯一标识 */
  public uuid: string = createUuid()

  constructor (item: ShapeProp, index: number) {
    this.index = index
    Object.assign(this, item)
  }
}
