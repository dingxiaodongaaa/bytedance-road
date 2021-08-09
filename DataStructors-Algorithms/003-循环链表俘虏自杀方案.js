// 写一段程序将 n 个人围成一圈，第 m 个人会被杀掉，循环直到杀掉所有人，循环列表。
function LNode (element) {
  this.next = null
  this.element = element
}

function Llist () {
  this.head = new LNode('head')
  this.head.next = this.head
  this.currentNode = this.head
  this.find = find
  this.insert = insert
  this.remove = remove
  this.display = display
  this.findPrevious = findPrevious
  this.back = back
  this.length = length
}

function find (element) {
  let currentNode = this.head
  while (currentNode.next != this.head && currentNode.element !== element) {
    currentNode = currentNode.next
  }
  if (currentNode.element === element) return currentNode
  return null
}

function insert (newElement, element) {
  const newNode = new LNode(newElement)
  const currentNode = this.find(element)
  newNode.next = currentNode.next
  currentNode.next = newNode
}

function findPrevious (element) {
  let currentNode = this.head
  while (currentNode.next != this.head && currentNode.next.element !== element) {
    currentNode = currentNode.next
  }
  if (currentNode.next.element === element) return currentNode
  return null
}

function remove (element) {
  const previousNode = this.findPrevious(element)
  previousNode.next = previousNode.next.next
}

function display () {
  let currentNode = this.head
  while (currentNode.next != this.head && currentNode.next) {
    console.log(currentNode.next.element)
    currentNode = currentNode.next
  }
}

function back (n) {
  while (n--) {
    this.currentNode = this.currentNode.next === this.head ? this.currentNode.next.next : this.currentNode.next
  }
}

function length () {
  let currentNode = this.head
  let length = 0
  while(currentNode.next !== this.head) {
    currentNode = currentNode.next
    length++
  }
  return length
}

// const ll = new Llist()
// for (let i = 0; i < 40; i++) {
//   if (i === 0) {
//     ll.insert(i, 'head')
//   } else {
//     ll.insert(i, i - 1)
//   }
// }
// ll.display()
// ll.remove(2)
// ll.display()
function createCircle (n) {
  const ll = new Llist()
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      ll.insert(i, 'head')
    } else {
      ll.insert(i, i - 1)
    }
  }
  return ll
}

function suicideCircle (ll, m) {
  while (ll.length() > m) {
    ll.back(m)
    ll.remove(ll.currentNode.element)
  }
}

function testCase (n, m) {
  const circle = createCircle(n)
  suicideCircle(circle, m)
  circle.display()
}

testCase(4, 3)