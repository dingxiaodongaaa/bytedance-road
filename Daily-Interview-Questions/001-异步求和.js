/**
 * 提供一个异步 add 方法如下，需要实现一个 await sum(...args) 函数
 */
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}
//----------------------------------------------------------------------
// 计算两个数的和
function sumTwo (a, b) {
  console.log(a, b)
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, res) => {
      if (!err) {
        resolve(res)
      }
      reject(err)
    })
  })
}

// async function testFunc () {
//   const test = await sumTwo(2, 3)
//   console.log(test)
// }

// testFunc()

// 计算多个数的和
// function sum (...args) {
//   return args.reduce((acc, cur) => acc.then(res => sumTwo(res, cur)), Promise.resolve(0))
// }

// async function testFunc () {
//   console.time('sum')
//   const test = await sum(1, 2, 3, 4, 5)
//   console.timeEnd('sum')
//   console.log(test)
// }

// testFunc()

// 计算多个数的和
async function sum (...args) {
  if (args.length === 1) return args[0]

  const PromiseList = []
  for (let i = 0; i < args.length; i+=2) {
    PromiseList.push(sumTwo(args[i], args[++i]))
  }
  if (!args.length % 2) PromiseList.push(args[args.length - 1])

  return sum(...await Promise.all(PromiseList))
}

async function testFunc () {
  console.time('sum')
  const test = await sum(1, 2, 3, 4, 5)
  console.timeEnd('sum')
  console.log(test)
}

testFunc()