/**
 * 1. 使用 requestAnimationFrame 模拟一个事件环
 * 2. Task Queue 为一个数组
 */

// 任务队列
let TaskQueue = []
// MicoTask 队列
let MicoTaskQueue = []

// 事件环
function EventLoop () {
  const now = Date.now()
  const len = TaskQueue.length
  for (let i = 0; i < len; i++) {
    const currentTask = TaskQueue[i]
    if (currentTask.startTime + currentTask.delay <= now) {
      currentTask.handle(...currentTask.args)
      if (currentTask.type === 'interval') {
        currentTask.startTime = now
      } else if (currentTask.type === 'timeout') {
        TaskQueue[i] = null
      }
    }
  }
  TaskQueue = TaskQueue.filter(item => !!item)
  requestAnimationFrame(EventLoop)
}
EventLoop()

function mySetTimeout (handle, delay, ...args) {
  const now = Date.now()
  if (typeof handle !== 'function') throw new Error('handle must a function')
  delay = typeof delay !== 'number' ? 0 : delay

  const task = {
    type: 'timeout',
    handle,
    startTime: now,
    delay,
    args
  }

  TaskQueue.push(task)
  return task
}

function myClearTimeout (task) {
  TaskQueue = TaskQueue.filter(item => item !== task)
}

function mySetInterval (handle, delay, ...args) {
  const now = Date.now()
  if (typeof handle !== 'function') throw new Error('handle must a function')
  delay = typeof delay !== 'number' ? 0 : delay

  const task = {
    type: 'interval',
    handle,
    startTime: now,
    delay,
    args
  }

  TaskQueue.push(task)
  return task
}

function myClearInterval (task) {
  TaskQueue = TaskQueue.filter(item => item !== task)
}

const PENDING = 'pending'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor (executor) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      throw err
    }
  }
  _state = PENDING
  _result = undefined
  _fulfilledQueue = []
  _rejectedQueue = []
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
  // 根据 Promise 的状态分别执行对应的回调方法，并将对应的结果传给回调函数
  then (onfulfilled, onrejected) {
    // then 需要一直传递下去
    onfulfilled = onfulfilled ? onfulfilled : value => value
    // catch 也需要一直传下去
    onrejected = onrejected ? onrejected : reason => { throw reason }
    const nextPromise = new MyPromise((resolve, reject) => {
      if (this._state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onfulfilled(this._result)
            resolvePromise(nextPromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      } else if (this._state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onrejected(this._result)
            resolvePromise(nextPromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      } else if (this._state === PENDING) {
        this._fulfilledQueue.push(() => {
          setTimeout(() => {
            try {
              const x = onfulfilled(this._result)
              resolvePromise(nextPromise, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
        this._rejectedQueue.push(() => {
          setTimeout(() => {
            try {
              const x = onrejected(this._result)
              resolvePromise(nextPromise, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
      }
    })
    return nextPromise
  }
  catch (errcb) {
    return this.then(undefined, errcb)
  }
  finally (finallycb) {
    return this.then(res => {
      return MyPromise.resolve(finallycb()).then(() => res)
    }, err => {
      return MyPromise.resolve(finallycb()).then(() => {
        throw err
      })
    })
  }
  static resolve (value) {
    if (value instanceof MyPromise) {
      return value
    } else {
      return new MyPromise(resolve => resolve(value))
    }
  }
  static all (array) {
    const result = []
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
          array[i].then((res) => {
            addData(i, res)
          }, err => {
            reject(err)
          })
        } else {
          addData(i, array[i])
        }
      }
    })
  }
}

function resolvePromise (nextPromise, x, resolve, reject) {
  if (nextPromise === x) {
    return reject('then方法被循环调用了')
  }
  if (x instanceof MyPromise) {
    // 如果是 Prmise
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}
