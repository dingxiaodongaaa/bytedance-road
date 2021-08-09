# 八股文之手写一个 promise

> 1. Promise 就是一个类，执行这个类的时候，传入一个执行器函数，这个函数会立即执行。
> 2. Promise 有三种状态 pending, fulfilled, rejected ,分别对应等待、成功和失败。状态只能从 pending 变成 fulfilled 或者从 pending 变成 rejected ，状态发生一次改变之后就不会再发生变化。
> 3. resolve 方法和 reject 方法是用来改变 Promise 的状态的。resolve ： pending -> fulfilled ；reject ： pending -> rejected。
> 4. then 方法是用来根据 Promise 的状态去执行相应的回调函数的，如果是 fulfilled 就去执行成功的回调如果是 rejected 就去执行失败的回调，如果是 pending 就去将回调函数添加到对应队列中，等待 resolve 或者 reject 改变 Promise 的状态之后去执行相应的队列中的回调函数。
> 5. then 方法中的成功回调有一个参数表示成功之后的结果，失败回调也会有一个参数表示失败的原因。
> 6. 同一个 Promise 对象的 then 方法可以被多次调用。
> 7. then 方法可以被链式调用，后面的 then 方法的回调函数中接收到的参数是上一个 then 方法的回调函数的返回值。
> 8. 静态方法 Promise.resolve() 接收一个参数，如果是一个 Promise 对象则直接返回，如果不是则返回一个新的 Promise 并将接收到的参数 resolve 出去。
> 9. 静态方法 Promise.finally() 接收一个回调函数，会在 Promise 的状态发生变化之后执行回调函数，不管是变为 fulfilled 状态还是 rejected 状态，都会执行。该方法返回一个 Promise 对象，可以通过 then 获取到最终的执行结果。
> 10. 静态方法 Promise.all() 接收一个数组参数，按照传入数组的顺序返回一个结果数组。传入数组元素如果是一个 Promise 对象则返回对应的 then 中的成功的结果或者是失败的原因，否则直接返回。
> 11. catch 方法，即调用了第一个回调函数为 undefined 的 then 方法。

