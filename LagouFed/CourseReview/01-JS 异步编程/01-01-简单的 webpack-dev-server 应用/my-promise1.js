const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor (executor) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.rejectind(err)
    }
  }
  _state = PENDING
  _reason = undefined
  _value = undefined
  _onfulfilledQueue = []
  _onrejectedQueue = []
  resolve (value) {
    if (this._state !== PENDING) return
    this._state = FULFILLED
    this._value = value
    // 执行回调
    while (this._onfulfilledQueue.length) {
      const thisOnfulfilled = this._onfulfilledQueue.shift()
      setTimeout(() => {
        thisOnfulfilled(this._value)
      })
    }
  }
  reject (reason) {
    if (this._state !== PENDING) return
    this._state = REJECTED
    this._reason = reason
    // 执行回调
    while (this._onrejectedQueue.length) {
      const thisOnrejected = this._onrejectedQueue.shift()
      setTimeout(() => {
        thisOnrejected(this._reason)
      })
    }
  }
  then (onfulfilled, onrejected) {
    const nextPromise = new MyPromise((resolve, reject) => {
      if (this._state === FULFILLED) {
        try {
          const x = onfulfilled(this._value)
          resolvePromise(nextPromise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      } else if (this._state === REJECTED) {
        try {
          const x = onrejected(this._reason)
          resolvePromise(nextPromise, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      } else {
        this._onfulfilledQueue.push(onfulfilled)
        this._onrejectedQueue.push(onrejected)
      }
    })
    return nextPromise
  }
}

function resolvePromise (nextPromise, x, resolve, reject) {
  if (nextPromise === x) {
    return reject(new TypeError('then循环调用'))
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise