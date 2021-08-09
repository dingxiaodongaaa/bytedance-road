function ajax (url) {
  return new Promise ((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'json'
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

// ajax('./data/user.json').then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

/**
 * Promise 就是使用 then 方法去传递回调函数，其异步实现的本质还是回调函数
 * 嵌套使用 Promise 是一个非常常见的使用误区，如下代码
 */

// ajax('./data/user.json').then(res => {
//   console.log(res)
//   ajax('./data/user.json').then(res => {
//     console.log(res)
//     ajax('./data/user.json').then(res => {
//       console.log(res)
//     }).catch(err => {
//       console.log(err)
//     })
//   }).catch(err => {
//     console.log(err)
//   })
// }).catch(err => {
//   console.log(err)
// })

/**
 * Promise 的 then 方法会返回一个全新的 Promise 对象
 * 可以给这个 Promise 添加相应的 then 以及 catch 回调方法，即 Promise 的链式调用
 */

// ajax('./data/user.json').then(res => {
//   console.log('fulfilled1', res)
//   throw new Error('出错了')
// }, err => {
//   console.log('rejected1', err)
// }).then(res => {
//   console.log('fulfilled2', res)
// }, err => {
//   console.log('rejected2', err)
//   return ajax('./data/user.json')
// }).then(res => {
//   console.log('fulfilled', res)
// })

/**
 * .then 后面接一个 .catch 是一个非常常见的链式调用的写法
 * 其实 .then 后面的 .catch 是给 .then 返回的 Promise 添加的 rejected 状态的回调函数
 * 但是由于第一个 Promise 的状态会一直往后传递，所以 .catch 也能相应的捕获到之前的 Promise 的 rejected 状态
 * 这个的前提是没有使用 return 方法手动的影响到上一个 Promise 的状态。
 * Promise 链上的 错误会一直往下传递，直到被某一个 catch 捕获
 */

// ajax('./data/user.json').then(res => {
//   console.log('fulfilled1', res)
//   throw new Error('出错了')
// }).catch(err => {
//   console.log('rejected1', err)
// }).then(res => {
//   console.log('fulfilled2', res)
// }).catch(err => {
//   console.log('rejected2', err)
//   return ajax('./data/user.json')
// }).then(res => {
//   console.log('fulfilled', res)
// })

/**
 * 可以在全局添加一个 unhandledrejection 事件，捕获代码中未被捕获到的 rejected 状态的 Promise
 * 但是这种方法并不建议被使用，因为会出现错误难以追踪的问题，最好的姿势还是在每一个 Promise 中声明对应的错误处理
 */

// window.addEventListener('unhandledrejection', event => {
//   const { reason, promise } = event
//   console.log(reason, promise)
//   // reason => Promise 失败原因，一般是有个错误对象
//   // promise => 出现异常的 Promise 对象

//   event.preventDefault()
// })

/**
 * Promise.resolve() Promise 的一个静态方法，用于将一个值转换为 Promise 对象 fulfilled 状态的返回值。
 * 使用 Promise.resolve 包装一个 Promise 对象，这两个 Promise 对象是 === 相同的。
 */

Promise.resolve(1).then()