// 防抖方法
function debounce (handle, immediate, delay) {
  if (typeof handle !== 'function') throw 'handle must a function'
  if (typeof immediate === 'number') {
    delay = immediate
    immediate = false
  } else {
    delay = delay ? delay : 400
  }
  let timer = null
  const self = this
  return function (args) {
    // immediate && handle(...args)
    clearTimeout(timer)
    timer = setTimeout(() => {
      handle.call(self, args)
    }, delay)
  }
}