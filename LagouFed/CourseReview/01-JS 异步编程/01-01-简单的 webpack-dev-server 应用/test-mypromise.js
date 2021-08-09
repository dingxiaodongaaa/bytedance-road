const MyPromise = require('./my-promise.js')

// const other = function () {
//   return new MyPromise((resolve, reject) => {
//     resolve('other 成功')
//     reject('other 失败')
//   })
// }

// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('成功')
//     reject('失败')
//   }, 2000)
// })

// const aaa = promise.then().then (res => {
//   console.log(res)
//   return 'bbbb'
// }, err => {
//   console.log(err)
// })

// aaa.then(res => {
//   console.log(res)
//   return 'ccc'
// }, err => {
//   console.log(err.message)
//   return 2
//   // throw new Error('kkk')
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// promise.then(res => {
//   console.log(res)
//   return promise
// }, err => {
//   console.log(err)
// }).then(res => {
//   console.log('22222', res)
// }, err => {
//   console.log(err)
// })

// const p1 = function () {
//   return new MyPromise((resolve, reject) => {
//     setTimeout(function () {
//       resolve('p1')
//     }, 2000)
//   })
// }

const p2 = function () {
  return new MyPromise(function (resolve, reject) {
    reject('p2')
  })
}

// MyPromise.all(['a', 'b', p1(), p2(), 'c', 'd']).then(res => console.log(res))

// MyPromise.resolve(p2()).then(res => {
//   console.log(res)
// })

// MyPromise.resolve(3333).then(res => {
//   console.log(res)
// })

p2().then(res => {
  console.log('then', res)
}, err => {
  console.log('catch', err)
})
