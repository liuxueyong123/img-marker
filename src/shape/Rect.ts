import { type Point, ShapeType } from '../type'
import Shape from './index'

export default class Rect extends Shape {
  public type = ShapeType.rect

  public static MIN_WIDTH = 10
  public static MIN_HEIGHT = 10

  constructor (item: any) {
    super(item)
    this.type = ShapeType.rect
  }

  get ctrlsData (): Point[] {
    const [[x0, y0], [x1, y1]] = this.coor
    return [
      [x0, y0],
      [x0 + (x1 - x0) / 2, y0],
      [x1, y0],
      [x1, y0 + (y1 - y0) / 2],
      [x1, y1],
      [x0 + (x1 - x0) / 2, y1],
      [x0, y1],
      [x0, y0 + (y1 - y0) / 2]
    ]
  }
}
