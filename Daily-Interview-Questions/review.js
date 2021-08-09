/**
 * 提供一个异步 add 方法如下，需要实现一个 await sum(...args) 函数
 */
 function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}
// ---------------------------------------------------------------

function sumTwo (a, b) {
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, res) => {
      if (!err) {
        resolve(res)
      }
      reject(err)
    })
  })
}

async function sum (...args) {
  if (args.length === 1) return args[0]

  let PromiseList = []
  for(let i = 0; i < args.length; i+=2) {
    if (args.length !== i) PromiseList.push(sumTwo(args[i], args[++i]))
  }
  if (!args.length % 2) PromiseList.push(args[args.length - 1])

  return sum(...await Promise.all(PromiseList))
}

async function testFunc () {
  console.time('sum')
  const result = await sum(1, 2, 3, 4)
  console.timeEnd('sum')
  console.log(result)
}

testFunc()