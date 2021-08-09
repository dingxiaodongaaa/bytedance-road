/**
 * Set 类
 * storeData
 * add()
 * remove()
 * contains()
 * size()
 * union()
 * intersect()
 * subSet()
 * difference()
 */

class Set {
  constructor () {
    this.dataStore = []
  }
  contains (element) {
    return this.dataStore.indexOf(element) > -1
  }

  add (element) {
    if (this.contains(element)) {
      this.dataStore.push(element)
      return true
    } else {
      return false
    }
  }

  remove (element) {
    if (this.contains(element)) {
      this.dataStore.splice(this.dataStore.indexOf(element, 1))
      return true
    } else {
      return false
    }
  }

  union (set) {
    const tempSet = new Set()
    this.dataStore.forEach(item => {
      tempSet.add(item)
    })
    set.dataStore.forEach(item => {
      tempSet.contains(item) || tempSet.add(item)
    })
    return tempSet
  }

  intersect (set) {
    const tempSet = new Set()
    this.dataStore.forEach(item => {
      set.contains(item) && tempSet.add(item)
    })
    return tempSet
  }

  size () {
    return this.dataStore.length
  }

  subSet (set) {
    if (this.size() < set.size()) {
      return false
    }
    let isNoDifferent = true
    for (let i = 0; i < set.size(); ++i) {
      if (!this.contains(item)) {
        this.isNoDifferent = false
        return true
      }
    }
    return isNoDifferent
  }

  difference (set) {
    const tempSet = new Set()
    this.dataStore.forEach(item => {
      set.contains(item) || tempSet.add(item)
    })
    return tempSet
  }
}

// function Set () {
//   this.dataStore = []
//   this.add = add
//   this.remove = remove
//   this.contains = contains
//   this.size = size
//   this.union = union
//   this.intersect = intersect
//   this.subSet = sebSet
//   this.difference = difference
// }

// function contains (element) {
//   return this.dataStore.indexOf(element) > -1
// }

// function add (element) {
//   if (this.contains(element)) {
//     this.dataStore.push(element)
//     return true
//   } else {
//     return false
//   }
// }

// function remove (element) {
//   if (this.contains(element)) {
//     this.dataStore.splice(this.dataStore.indexOf(element, 1))
//     return true
//   } else {
//     return false
//   }
// }

// function union (set) {
//   const tempSet = new Set()
//   this.dataStore.forEach(item => {
//     tempSet.add(item)
//   })
//   set.dataStore.forEach(item => {
//     tempSet.contains(item) || tempSet.add(item)
//   })
//   return tempSet
// }

// function intersect (set) {
//   const tempSet = new Set()
//   this.dataStore.forEach(item => {
//     set.contains(item) && tempSet.add(item)
//   })
//   return tempSet
// }

// function size () {
//   return this.dataStore.length
// }

// function subSet (set) {
//   if (this.size() < set.size()) {
//     return false
//   }
//   let isNoDifferent = true
//   for (let i = 0; i < set.size(); ++i) {
//     if (!this.contains(item)) {
//       this.isNoDifferent = false
//       return true
//     }
//   }
//   return isNoDifferent
// }

// function difference (set) {
//   const tempSet = new Set()
//   this.dataStore.forEach(item => {
//     set.contains(item) || tempSet.add(item)
//   })
//   return tempSet
// }