function get (object, path, defaultValue) {
  if (typeof object !== 'object' || object === null) {
    return defaultValue
  }
  const retPath = forMatPath(path)
  const result = getValueFromPath(retPath, object)
  return result === undefined ? defaultValue : result
}

function forMatPath (path) {
  if (Array.isArray(path)) {
    return path
  }
  let newPath = path.replace(/\[/g,'.').replace(/\]/g,'').split('.')
  if (newPath.length && newPath[0] === '') {
    newPath.shift()
  }
  return newPath
}

function getValueFromPath (path, object) {
  let index = 1
  let currentRet = object[path[0]]
  while (currentRet !== undefined && index < path.length) {
    currentRet = currentRet[path[index]]
    index++
  }
  return currentRet
}

const obj = [
  {
    name: {
      first: "byte"
    }
  }
]

console.log(get(obj, ['0', 'name', 'fist'], 2)) // 2
console.log(get(obj, ['0', 'name', 'first'], 2)) // byte
console.log(get(obj, '[0].name.fist', 2)) // 2
console.log(get(obj, '[0].name.first')) // byte
