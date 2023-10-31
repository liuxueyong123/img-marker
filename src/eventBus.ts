import { type EventType, type EventCallbacks } from './type'

class EventBus {
  private readonly eventTree = new Map<EventType, Array<EventCallbacks[EventType]>>()

  /**
 * 注册事件
 * @param eventName 事件名称
 * @param cb 回调方法
 */
  on<T extends EventType>(eventName: T, cb: EventCallbacks[T]) {
    const fns = this.eventTree.get(eventName) ?? []
    this.eventTree.set(eventName, [...fns, cb])
  }

  /**
   * 触发事件
   * @param eventName 事件名称
   * @param payload 传递参数
   */
  emit<T extends EventType>(eventName: T, ...payload: Parameters<EventCallbacks[T]>) {
    const fns = this.eventTree.get(eventName) ?? []
    for (const fn of fns) {
      (fn as any).apply(null, payload)
    }
  }

  /**
   * 注销事件
   * @param eventName 事件名称
   * @param cb 传递参数
   */
  off<T extends EventType>(eventName: T, cb: EventCallbacks[T]) {
    const fns = this.eventTree.get(eventName) ?? []
    const index = fns.findIndex((fn) => fn === cb)
    fns.splice(index, 1)
    this.eventTree.set(eventName, fns)
  }
}

const eventBus = new EventBus()
export default eventBus
