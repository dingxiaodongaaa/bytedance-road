const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  _state = PENDING
  _result = undefined
  _fulfilledQueue = []
  _rejectedQueue = []
  constructor (executor) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }
  resolve (value) {
    if (this._state !== PENDING) return
    this._state = FULFILLED
    this._result = value
    while (this._fulfilledQueue.length) {
      this._fulfilledQueue.shift()()
    }
  }
  reject (reason) {
    if (this._state !== PENDING) return
    this._state = REJECTED
    this._result = reason
    while (this._rejectedQueue.length) {
      this._rejectedQueue.shift()()
    }
  }
  then (onfulfilled, onrejected) {
    onfulfilled = onfulfilled ? onfulfilled : value => value
    onrejected = onrejected ? onrejected : error => { throw error }
    const nextPromise = new MyPromise((resolve, reject) => {
      if (this._state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onfulfilled(this._result)
            resolvePromise(nextPromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      } else if (this._state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onrejected(this._result)
            resolvePromise(nextPromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      } else {
        this._fulfilledQueue.push(() => {
          setTimeout(() => {
            try {
              const x = onfulfilled(this._result)
              resolvePromise(nextPromise, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
        this._rejectedQueue.push(() => {
          setTimeout(() => {
            try {
              const x = onrejected(this._result)
              resolvePromise(nextPromise, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
      }
    })
    
    return nextPromise
  }
  finally (callback) {
    return this.then(res => {
      return MyPromise.resolve(callback()).then(() => res)
    }, err => {
      return MyPromise.resolve(callback()).then(() => { throw err })
    })
  }
  catch (failcallback) {
    return this.then(undefined, failcallback)
  }
  static all (array) {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData (key, value) {
        result[key] = value
        index++
        if (index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof MyPromise) {
          array[i].then(res => {
            addData(i, res)
          }, err => reject(err))
        } else {
          addData(i, array[i])
        }
      }
    })
  }
  static resolve (value) {
    if (value instanceof MyPromise) {
      return value
    } else {
      return new MyPromise(resolve => {
        resolve(value)
      })
    }
  }
}

function resolvePromise (nextPromise, x, resolve, reject) {
  if (nextPromise === x) {
    return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise