# Eventloop 主题

Task：宏任务  微任务

Task： 这个概念是由 W3C 来制订的浏览器 API 的一部分。并不是 ECMAScript 规范的一部分。如 setTimeout setInterval

MicroTask：这块其实是包括在 ECMAScript 规范的一部分。如 Promise async

1. 启动 Eventloop， 可以理解为一个死循环（while(true){}）
2. 启动 Task 内部任务的扫描，查看是否有 Task 任务完成
3. 启动 JS 引擎，解析并执行你的代码

1. 事件循环 requestAnimationFrame

可以理解为 setTimeout 就是一个往 taskQueue 队列中 push 一个元素的 api ，这个 api 会往 task 队列中添加一个宏任务对象，当然这个对象中包含了宏任务的一些属性。