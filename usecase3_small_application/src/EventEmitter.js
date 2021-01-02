export class EventEmitter {
  constructor() {
    this._listeners = new Map()
  }

  /**
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  addEventListener(type, listener) {
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set())
    }
    const listenerSet = this._listeners.get(type)
    listenerSet.add(listener)
  }

  /**
   * @param {string} type イベント名
   */
  emit(type) {
    const listenerSet = this._listeners.get(type)
    if (!listenerSet) {
      return
    }
    listenerSet.forEach(listener => {
      listener.call(this)
    });
  }

  /**
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  removeEventListener(type, listener) {
    const listenerSet = this._listeners.get(type)
    if (!listenerSet) {
      return
    }
    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
        listenerSet.delete(listener)
      }
    })
  }
}