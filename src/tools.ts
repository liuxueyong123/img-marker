export const createUuid = (): string => {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
  }
  let timestamp = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16
    random = (timestamp + random) % 16 | 0
    timestamp = Math.floor(timestamp / 16)
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}

export const isMobile = (): boolean => {
  return window.navigator?.userAgent.includes('Mobile')
}
