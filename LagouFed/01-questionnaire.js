// 第一题答案： C
// 1. 由于 Child 构造函数中调用了 Parent.call(this, name); 使用 new 调用 Child 的时候，其返回的 child 对象中会有 sayMyName 
// 和 sayMyAge 这两个方法以及 name 和 age 这两个属性，通过 child.sayMyName() 和 child.sayMyAge() 调用的时候两个方法的 this 
// 都会指向 child 对象，所以，打印 18，Eros；
// 2. 通过 Func.prototype = Parent.prototype; Child.prototype = new Func(); 重写了 Child 的原型，所以当调用 child.jump() 
// 的时候，会到 child.__proto__ 上面去找到这个方法并执行，即 child.__proto__.jump(); 即 window.Child.prototype.jump() 所
// 以，这个时候 jump 中的 this 应该是指向 window 所以打印 global jump。

// 第二题答案： B
// 1. obj 对象为 { a: 1, b: 2, c: f, d: f } 故先打印 1
// 2. 箭头函数中的 this 指向立即执行函数上下文故打印 undefined
// 3. 普通函数 this 指向调用它的对象 obj 故打印 2
// 4. 同 2 故打印 undefined
// 5. window.d() this 指向 window 故打印 undefined

// 第三题答案： A
// 代码的执行流程如下：
// console.log(1)
// 将 setTimeout1 回调函数放入 tasks 队列
// promise1 的 then 的回调函数放入 promise1 的 reactions 队列
// promise2 的 then 的回调函数放入 microTasks 队列
// console.log(4)
// setTimeout2 回调函数放入 tasks 队列
// 执行 microTasks 中的方法
// console.log(3)
// 执行 tasks 中的方法
// promise1 的 reactions 中的方法进入 microTasks 队列
// 执行 microTasks 中的方法
// console.log(2)
// await 后面的方法进入 microTasks 队列
// 执行 microTasks 中的方法
// console.log(5)

// 第四题答案：
// function inherbit(Child, Parent) {
//   const temp = Object.create({}, Parent.prototype)
//   Child.prototype = Object.create(Child.prototype, Parent.prototype)
// }
// Child 原型方法的重写不会影响到 Parent 的原型方法
// 但是这种方法不能继承 Parent 构造函数中的属性以及方法，只能继承其原型的属性和方法，即只能部分继承。

// 第五题答案：
function red(){  console.log("red...");}
function green(){  console.log("green...");}
function yellow(){  console.log("yellow...");}
function startLoopLight(arr) {
  let promise = Promise.resolve()
  for(let i = 0; i < arr.length; ++i) {
    promise = promise.then(() => {
      arr[i][0]()
    }).then(() => {
      return wait(arr[i][1])
    })
  }

  return promise.then(() => {
    startLoopLight(arr)
  })
}

function wait(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, delay)
  })
}

startLoopLight([  [red, 1000],  [green, 2000],  [yellow, 3000],]);