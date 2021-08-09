// 双向链表
function LNode (element) {
  this.previous = null
  this.next = null
  this.element = element
}

function Llist () {
  this.head = new LNode('head')
  this.find = find
  this.insert = insert
  this.remove = remove
  this.display = display
}

function find (element) {
  let currentNode = this.head
  while (currentNode.element !== element) {
    currentNode = currentNode.next
  }
  return currentNode
}

function insert (newElement, element) {
  const newNode = new LNode(newElement)
  const currentNode = this.find(element)
  newNode.next = currentNode.next
  currentNode.next && (currentNode.next.previous = newNode)
  currentNode.next = newNode
  newNode.previous = currentNode
}

function remove (element) {
  const currentNode = this.find(element)
  currentNode.previous.next = currentNode.next
  currentNode.next.previous = currentNode.previous
  currentNode.previous = null
  currentNode.next = null
}

function display () {
  let currentNode = this.head
  while (currentNode.next) {
    console.log(currentNode.next.element)
    currentNode = currentNode.next
  }
}

const ll = new Llist()
ll.insert('a', 'head')
ll.insert('b', 'a')
ll.insert('d', 'b')
ll.insert('c', 'b')
ll.display()
// ll.remove('c')
console.log(ll.find('d').previous.element)
// ll.display()
// ll.remove('b')
// ll.display()
// ll.remove('a')
// ll.display()