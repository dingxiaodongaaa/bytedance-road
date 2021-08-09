// const MyPromise = require('./my-promise1.js')

// new MyPromise((resolve, reject) => {
//   resolve('成功')
//   reject('失败')
// }).then(value => {
//   console.log(value)
// }, reason => {
//   console.log(reason)
// })

// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject('error')
//   }, 2000)
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// const p1 = new MyPromise((resolve, reject) => {
//   reject('error')
// })

// p1.then(res => {
//   console.log('p1', res)
// }, reason => {
//   console.log('p1', reason)
// })

// p1.then(res => {
//   console.log('p2', res)
// }, reason => {
//   console.log('p1', reason)
// })

// p1.then(res => {
//   console.log('p2', res)
// }, reason => {
//   console.log('p1', reason)
// })

// setTimeout(() => {
//   console.log(2)
// })

// function SuperType () {
//   this.property = true
// }

// SuperType.prototype.getSuperValue = function () {
//   return this.property
// }

// function SubType () {
//   this.subProperty = false
// }

// SubType.prototype = new SuperType()

// SubType.prototype.getSubValue = function () {
//   return this.subProperty
// }

// SubType.prototype.getSuperValue = function () {
//   return 2
// }

// var instance = new SubType()
// console.log(instance.getSuperValue())
// console.log(instance)

var addTwoNumbers = function(l1, l2) {
  let l1CurrentNode = l1
  let l2CurrentNode = l2
  let promoteNum = 0
  let retList = null
  let retCurrentNode
  while (l1CurrentNode !== null || l2CurrentNode !== null) {
    if (!retList) {
      retCurrentNode = {
        val: null,
        next: null
      }
      retList = retCurrentNode
    } else {
      const newNode = {
        val: null,
        next: null
      }
  
      retCurrentNode.next = newNode
      retCurrentNode = newNode
    }
    const sum = (l1CurrentNode ? l1CurrentNode.val : 0) + (l2CurrentNode ? l2CurrentNode.val : 0) + promoteNum
    let retVal = 0
    if (sum > 9) {
      promoteNum = 1
      retVal = sum - 10
    } else {
      promoteNum = 0
      retVal = sum
    }
    const iss = retList.next == retCurrentNode
    retCurrentNode.val = retVal

    l1CurrentNode = l1CurrentNode.next
    l2CurrentNode = l2CurrentNode.next
  }
  return retList
};

var l1 = { val: 1, next: null }
l1.next = { val: 2, next: null }

var l2 = { val: 2, next: null }
l2.next = { val: 3, next: null }

console.log(addTwoNumbers(l1, l2))