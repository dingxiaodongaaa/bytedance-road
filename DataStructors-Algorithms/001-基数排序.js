// 使用基数排序，实现一百以内的数字数组排序
// 队列
function Queue () {
  this.dataStore = []
  this.enqueue = enqueue
  this.dequeue = dequeue
  this.empty = empty
}

function enqueue (element) {
  this.dataStore.push(element)
}

function dequeue (element) {
  return this.dataStore.shift()
}

function empty () {
  return this.dataStore.length === 0
}

function radixSort (arr) {
  const queues = []
  for(let i = 0; i < 10; ++i) {
    queues[i] = new Queue()
  }

  // 按照个位数站队
  for(let i = 0; i < arr.length; ++i) {
    queues[arr[i] % 10].enqueue(arr[i])
  }
  arr = []
  // 重排数组
  for(let i = 0; i < 10; ++i) {
    while (!queues[i].empty()) {
      arr.push(queues[i].dequeue())
    }
  }

  // 按照十位数站队
  for(let i = 0; i < arr.length; ++i) {
    queues[Math.floor(arr[i] / 10)].enqueue(arr[i])
  }
  arr = []
  // 重排数组
  for(let i = 0; i < 10; ++i) {
    while (!queues[i].empty()) {
      arr.push(queues[i].dequeue())
    }
  }
  return arr
}

const arr = []
for (let i = 0; i < 10; ++i) {
  arr.push(Math.floor(Math.random() * 101))
}
console.log(arr)
const resArr = radixSort(arr)
console.log(resArr)