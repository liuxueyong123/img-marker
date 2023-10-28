import type Rect from './shape/Rect'

export type Point = [number, number]

export type AllShape = Rect
export enum ShapeType {
  rect = 1
}
export enum MarkMode {
  edit = 0,
  rect = ShapeType.rect
}
