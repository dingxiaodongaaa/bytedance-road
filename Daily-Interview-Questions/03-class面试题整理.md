
> 对标：P6-P6+  <br>
> 难度：⭐⭐⭐⭐


### 1. 请简要说一下物理像素、逻辑像素、像素密度的含义，同时为什么移动端需要是用到2、3倍图，Web有办法实现类似的需求么？

#### 物理像素

物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。

#### 逻辑像素

逻辑像素又称为设备独立像素或者密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素（比如CSS像素），然后由相关系统转换为物理像素。

#### CSS像素

CSS像素是一个抽象的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs。

#### 像素密度

像素密度是指一个设备表面存在的像素数量，它通常以每英寸有多少像素来计算。

### 2. 是简要说明new操作符的原理，同时使用JavaScript实现一个函数具备new操作符的功能。

1. 创建一个全新的对象 `obj`
2. 将 `obj` 的 `__proto__` 指向构造函数的 `prototype`
3. 将构造函数的 `this` 绑定到 `obj` 并执行
4. 如果构造函数有返回值并且是一个对象，就将这个对象返回，否则返回 obj

```js
function objectFactory() {
  const obj = new Object()
  const Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  const ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}
```

### 3. 请简要介绍HTTP2.0与HTTP1.1的异同，并简要介绍HTTP3.0的改进。

参考链接：https://juejin.cn/post/6844903844216832007#heading-0

#### HTTP2.0相对于HTTP1.x的新特性

1. *新的二进制格式：*HTTP/1.x的解析是基于文本的。基于文本协议的解析存在天然缺陷，文本的表现形式有多样性，要做到全面性考虑的场景必然很多。二进制则不同，只识别0和1的组合。基于这种考虑HTTP/2.0的协议解析采用二进制格式，方便且强大。
2. *多路复用：*HTTP/2.0支持多路复用，只是HTTP/1.x持久连接的升级版。多路复用就是在以个TCP连接中可以存在多条流，也就是可以发送多个请求，服务端则可以通过帧中的标识知道该帧属于哪个流（即请求），通过重新排序还原请求。多路复用允许并发的发起多个请求，每个请求及该请求的响应不需要等待其他的请求或响应，避免了线头阻塞问题。这样某个请求任务耗时严重，不会影响到其它连接的正常执行，极大的提高传输性能。
3. *头部压缩：*HTTP/1.x的请求和响应头部带有大量信息，而且每次请求都要重复发送，HTTP/2.0使用encoder来减少需要传输的头部大小，通讯双方各自cache一份头部 fields表，既避免了重复头部的传输，又减小了需要传输的大小。
4. *服务端推送：*这里的服务端推送指把客户端所需要的css/js/img资源伴随着index.html一起发送到客户端，省去了客户端重复请求的步骤（从缓存中取）。

#### HTTP3.0的改进

HTTP3.0 是一个基于 UDP 协议的“QUIC”协议

1. *快速握手：*由于QUIC是基于UDP的，没有TCP的三次握手机制，这意味着QUIC可以用最快的速度来发送和接收数据，这样可以大大提升首次打开页面的速度。0RTT 建连可以说是 QUIC 相比 HTTP2 最大的性能优势。
2. *解决TCP中队头阻塞：*和TCP不同，QUIC实现了在同一物理连接上可以有多个独立的逻辑数据流（如下图）。实现了数据流的单独传输，就解决了TCP中队头阻塞的问题。

### 4. 请简要介绍懒加载和预加载原理及其实现。

#### 懒加载

参考连接：https://juejin.cn/post/6844903614138286094

##### what？

懒加载也叫延迟加载，指的是在长网页中延迟加载图像，是一种很好优化网页性能的方式。用户滚动到它们之前，可视区域外的图像不会加载。这与图像预加载相反，在长网页上使用延迟加载将使网页加载更快。在某些情况下，它还可以帮助减少服务器负载。常适用图片很多，页面很长的电商网站场景中。

##### why

- 能提升用户的体验
- 减少无效资源的加载
- 防止并发加载的资源过多会阻塞js的加载

##### how

首先将页面上的图片的 src 属性设为空字符串，而图片的真实路径则设置在data-original属性中，
当页面滚动的时候需要去监听scroll事件，在scroll事件的回调中，判断我们的懒加载的图片是否进入可视区域,如果图片在可视区内将图片的 src 属性设置为data-original 的值，这样就可以实现延迟加载。

```js
rect=item.getBoundingClientRect()// 用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
if(rect.bottom >= 0 && rect.top < viewHeight) {
  // TODO: 加载图片
}
```

#### 预加载

##### what？

资源预加载是另一个性能优化技术，我们可以使用该技术来预先告知浏览器某些资源可能在将来会被使用到。预加载简单来说就是将所有所需的资源提前请求加载到本地，这样后面在需要用到时就直接从缓存取资源。

##### why

在网页全部加载之前，对一些主要内容进行加载，以提供给用户更好的体验，减少等待的时间。否则，如果一个页面的内容过于庞大，没有使用预加载技术的页面就会长时间的展现为一片空白，直到所有内容加载完毕。

##### how

1. 使用HTML标签

```html
<img src="http://pic26.nipic.com/20121213/6168183 0044449030002.jpg" style="display:none"/>
```

2. 使用Image对象

```html
<script src="./myPreload.js"></script>
```

```js
//myPreload.js文件
var image= new Image()
image.src="http://pic26.nipic.com/20121213/6168183 004444903000 2.jpg"
```

### 5. 请实现Promise.all方法。

#### 总结 promise.all 的特点

1. 接收一个 Promise 实例的数组或具有 Iterator 接口的对象。
2. 如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象。
3. 如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调。
4. 只要有一个失败，状态就变为 rejected，返回值将直接传递给回调。
5. all() 的返回值也是新的 Promise 对象。

```js
function promiseAll(promises) {
  return new Promise(function(resolve, reject) {
    if (!isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    var resolvedCounter = 0;
    var promiseNum = promises.length;
    var resolvedValues = new Array(promiseNum);
    for (var i = 0; i < promiseNum; i++) {
      (function(i) {
        Promise.resolve(promises[i]).then(function(value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function(reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}

```

### 6. 请实现一个千位分割函数。

#### 方法一：toLocaleString() 或 NumberFormat.format()

```js
function readableNumber(value) {
  return Number(value).toLocaleString()
}
console.log(readableNumber(12345678)) // 12,345,678
console.log(readableNumber(12345678.7899)) // 12,345,678.79

function readableNumber(value) {
  return new Intl.NumberFormat().format(Number(value))
}
console.log(readableNumber(12345678)) // 12,345,678
console.log(readableNumber(12345678.7899)) // 12,345,678.79
```

#### 方法二：正则

```js
function readableNumber(value) {
  const reg = /(\d)(?=(\d{3})+([.]\d+)?$)/g
  return value.toString().replace(reg, '$1,')
}
console.log(readableNumber(12345678)) // 12,345,678
console.log(readableNumber(12345678.7899)) // 12,345,678.7,899

// 不考虑小数点的写法
function readableNumber(value) {
  const reg = /(\d)(?=(\d{3})+$)/g
  const tempArr = value.toString().split('.')
  tempArr[0] = tempArr[0].replace(reg, '$1,')
  return tempArr.join('.')
}
console.log(readableNumber(12345678)) // 12,345,678
console.log(readableNumber(12345678.7899)) // 12,345,678.7899
```

#### 方法三：转成数组遍历

```js
function readableNumber(value) {
  // 第一步：将整数部分和小数部分分开
  const valueStr = value.toString()
  const tempArr = valueStr.split('.')
  const tempIntArr = tempArr[0].split('')
  // 第二步：遍历插入 ,
  for (let i = 2; i < tempArr[0].length; i += 4) {
    tempIntArr.splice(i, 0 , ',')
  }
  // 第三步：将整数部分和小数部分合并
  tempArr[0] =  tempIntArr.join('')
  return tempArr.join('.')
}
console.log(readableNumber(12345678)) // 12,345,678
console.log(readableNumber(12345678.7899)) // 12,345,678.7899
```