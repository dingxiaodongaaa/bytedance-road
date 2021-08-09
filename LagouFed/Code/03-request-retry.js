/**
 * 题目一：
 * 存在一个 request(option, callback) 函数用来进行 ajax 请求
 * 请使用 Promise 实现一个 retry(option, count) 函数。
 */

function retry (option, count) {
  return new Promise((resolve, reject) => {
    function cb (err, res) {
      if (!err) resolve(res)
      if (--count) {
        request(options, cb)
      } else {
        reject(err)
      }
    }
    request(option, cb)
  })
}

/**
 * 题目二：
 * 全局有一个方法 function ajax(url, option) ，其返回一个 Promise
 * 由于浏览器存在最大的并发限制，因此需要实现一个 createRequest 方法
 * 要求：
 * 1. 调用方式：const request = createRequest({ pool: 5 })
 * 2. 当前这个 request 函数和 ajax 的调用方式完全一致（参数级返回值均同）
 *    也就是表示在任何场景下，ajax 和 request 均可以完全等价
 * 3. 但两者表现不同，ajax 会同时发起最大 20 个请求，request 会在同一时刻最多并行 pool 个请求，例如：
 * for (let i = 0; i < 20; i++) {
 *  ajax("/usr", { id: i }.then(console.log)); // 20 个请求同时发起
 *  request("/usr", { id: i }.then(console.log)); // 同一个时刻至多 pool 个请求
 * }
 */
function createRequest (option = { pool: 5 }) {
  let requestPool = [] // 请求池
  let requestQueue = [] // 等待队列
  return function request (url, ajaxOption) {
    let length = requestPool.length
    if (length < option.pool) {
      const promise = ajax(url, ajaxOption).finally(() => {
        requestPool.splice(length - 1, 1)
        if (requestQueue.length) {
          const head = requestQueue.shift()
          // resolve 挂起的 Promise
          head.resolve(request (head.url, head.ajaxOption))
        }
      })
      requestPool.push(promise)
      return promise
    } else {
      // 请求池满了，就返回一个新的 Promise 将请求挂起
      return new Promise((resolve) => {
        requestQueue.push({url, ajaxOption, resolve})
      })
    }
  }
}

function ajax (url, options) {
  return fetch(url, options)
}
const request = createRequest({ pool:2 })
for (let i = 0; i  < 10; i++) {
  request(`https://jsonplaceholder.typicode.com/todos/${i+1}`).then(res => {
    console.log(res)
  }).catch(e=>{
     console.log(e)
  })
}

// Promise.resolve().then(() => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('timeout')
//       resolve(5)
//     })
//   })
// }).then((data) => {
//   console.log('1', data)
// }).then((data) => {
//   console.log('2', data)
// }).then((data) => {
//   console.log('3', data)
// })
