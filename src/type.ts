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

export enum EventType {
  Add = 'add',
  Select = 'select',
  Load = 'load',
  Update = 'update',
}

export interface EventCallbacks {
  [EventType.Add]: (args: AllShape) => void
  [EventType.Select]: (args: AllShape) => void
  [EventType.Load]: () => void
  [EventType.Update]: (args: AllShape[]) => void
}
