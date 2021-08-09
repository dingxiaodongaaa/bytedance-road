function * foo () {
  console.log('start')

  const res = yield 'foo'

  console.log('end', res)
}

const generator = foo()

generator.next()

generator.next('bar')

