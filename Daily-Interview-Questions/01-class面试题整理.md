
## 第一组
> 难度：⭐⭐⭐
> 对标职级：P5-P6

### 1. 请介绍一下CSS盒模型

![盒模型](https://raw.githubusercontent.com/dingxiaodongaaa/bytedance-road/master/Daily-Interview-Questions/images/boxmodel.png)

可以通过`box-sizing`属性更改盒模型计算总宽度和总高度的规则

- `content-box`
  - 盒子总宽度: width + padding-left + padding-right + border-left + border-right
  - 盒子总高度: height + padding-top + padding-bottom + border-top + border-bottom
- `border-box`
  - 盒子总宽度: width(即 width 包括了 border\padding\内容)
  - 盒子总高度: height(即 height 包括了 border\padding\内容)

> padding 是以元素本身的 width 为基础计算的，这点在实现 4:3 的盒子的时候很好用。
> margin 是以父元素的宽高为基础计算的。

### 2. 实现元素居中，请尽可能多的讲述方法？

#### 水平居中

1. 若是行内元素，给父元素设置 text-align: center;
2. 若是块元素，该元素设置 margin: 0 auto;
3. 若子元素包含 float: left; 属性，为了给子元素水平居中，可以给父元素设置 fit-content，并且配合 margin。

> 这种实现方式的结果是，让父元素的宽度等于子元素，并设置父元素水平居中

```css
.parent {
  width: -moz-fit-content;
  width: -webkit-fit-content;
  width: fit-content;
  margin: 0 auto;
}
```
fit-content 是 CSS3 中给 width 属性新加的一个属性值，它配合 margin 可以轻松实现水平居中，目前只支持 Chrome 和 Firefox 浏览器。

4. 使用flex 2012年版本布局, 可以轻松的实现水平居中, 子元素设置如下:

```css
.son{
  display: flex;
  justify-content: center;
}
```
5. 使用flex 2009年版本, 父元素display: box;box-pack: center;如下设置:

```css
.parent {
  // -webkit-（谷歌，Safari，新版Opera浏览器，以及几乎所有iOS系统中的浏览器（括 iOS 系统中的火狐浏览器）；基本上所有基于WebKit 内核的浏览器）
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: center;
  // -moz- （火狐浏览器）
  display: -moz-box;
  -moz-box-orient: horizontal;
  -moz-box-pack: center;
  // -o- （旧版Opera浏览器）
  display: -o-box;
  -o-box-orient: horizontal;
  -o-box-pack: center;
  // -ms- （IE浏览器 和 Edge浏览器）
  display: -ms-box;
  -ms-box-orient: horizontal;
  -ms-box-pack: center;

  display: box;
  box-orient: horizontal;
  box-pack: center;
}
```

6. 使用CSS3中新增的transform属性, 子元素设置如下:

```css
.son{
    position: absolute;
      left: 50%;
      transform: translate(-50%,0);
}
```

7. 使用绝对定位方式, 以及负值的margin-left, 子元素设置如下:

```css
.son{
    position: absolute;
    width: 固定;
    left: 50%;
    margin-left: -0.5宽度;
}
```

8. 使用绝对定位方式, 以及left:0;right:0;margin:0 auto; 子元素设置如下:

```css
.son{
    position: absolute;
    width: 固定;
    left: 0;
    right: 0;
    margin: 0 auto;
}
```

#### 水平居中

1. 若是单行文本，可以设置 line-height 等于父元素高度

2. 若是行内块元素，基本思想是使用 display: inline-block; vertical-align: middle 和一个为元素让内容块处于容器中央

> 这是一种很流行的方法, 也适应IE7.

```css
.parent::after, .son{
  display: inline-block;
  vertical-align: middle;
}
.parent::after{
  content: '';
  height: 100%;
}
```

3. 若是高度不定，可用 vertical-align 属性, 而 vertical-align 只有在父层为 td 或者 th 时, 才会生效, 对于其他块级元素, 例如 div、p 等, 默认情况是不支持的. 为了使用 vertical-align, 我们需要设置父元素 display:table , 子元素 display:table-cell;vertical-align:middle;

> 优点: 元素高度可以动态改变, 不需再CSS中定义, 如果父元素没有足够空间时, 该元素内容也不会被截断.<br>
> 缺点: IE6~7, 甚至IE8 beta中无效.

4. 可用 Flex 2012版, 这是CSS布局未来的趋势. Flexbox 是CSS3新增属性, 设计初衷是为了解决像垂直居中这样的常见布局问题。

> 优点: 
> 1. 内容块的宽高任意, 优雅的溢出.
> 2. 可用于更复杂高级的布局技术中.

> 缺点
> 1. IE8/IE9不支持
> 2. 需要浏览器厂商前缀
> 3. 渲染上可能会有一些问题

```css
.parent {
  display: flex;
  align-items: center;
}
```

5. 使用flex 2009版.

> 优点: 实现简单, 扩展性强<br>
> 缺点: 兼容性差, 不支持IE

```css
.parent {
  display: box;
  box-orient: vertical;
  box-pack: center;
}
```

6. 可用 transform , 设置父元素相对定位(position:relative), 子元素如下css样式:

> 优点: 代码量少<br>
> 缺点: IE8不支持, 属性需要追加浏览器厂商前缀, 可能干扰其他 transform 效果, 某些情形下会出现文本或元素边界渲染模糊的现象.

```css
.son{
  position: absolute;
  top: 50%;
  -webkit-transform: translate(-50%,-50%);  
  -ms-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
}
```



7. 若元素高度固定，设置父元素相对定位(position:relative), 子元素如下css样式:

> 优点: 适用于所有浏览器.<br>
> 缺点: 父元素空间不够时, 子元素可能不可见(当浏览器窗口缩小时,滚动条不出现时).如果子元素设置了overflow:auto, 则高度不够时, 会出现滚动条.

```css
.son{
  position: absolute;
  top: 50%;
  height: 固定;
  margin-top: -0.5高度;
}
```

8. 设置父元素相对定位(position:relative), 子元素如下css样式:


> 优点: 简单<br>
> 缺点: 没有足够空间时, 子元素会被截断, 但不会有滚动条.

```css
.son{
  position: absolute;
  height: 固定;
  top: 0;
  bottom: 0;
  margin: auto 0;
}
```

### 3. 请简单的介绍一下Flex的相关属性及其作用？

#### `flex-direction`

- 可选属性：`row`（默认）、`row-reverse`、`column`、`column-reverse`

- 作用：更改flex元素的排列方向

#### `flex-wrap`

- 可选属性：`nowrap`（默认）、`wrap`、`wrap-reverse`

- 作用：设置子元素超出容器换行

#### `flex-flow`

- 为 `flex-direction` 和 `flex-wrap` 的简写属性，第一个指定的值为 `flex-direction` 第二个为 `flex-wrap`

#### `align-items`

- 可选属性：`normal`（默认）、`stretch`、`flex-start`、`flex-end`、`center`

- 作用：设置子元素在交叉轴方向对齐方式

#### `justify-content`

- 可选属性：`normal`（默认）、`stretch`、`flex-start`、`flex-end`、`center`、`space-around`、`space-between`

- 作用：设置子元素在主轴方向上对齐方式

#### Flex 元素属性`flex-basis`

- 可选属性: `auto`(默认)、其他数值
- 作用：指定元素的宽度

#### Flex 元素属性：`flex-grow`

- 可选属性：1、2等数值
- 作用：按比例分配 flex 容器的可用空间

#### Flex 元素属性： `flex-shrink`

- 可选属性：1、2等数值
- 作用：指定子元素超出 flex 容器时，元素的收缩规则

#### `flex`

- 简写组合属性：`flex-grow`，`flex-shrink` 和 `flex-basis`

### 4. 是否使用过rem/vw等H5适配方案？其适配原理是什么？

rem/vw 的适配原理：根据页面的 clientWidth 动态的设置页面布局单位的大小，实现移动端设备中不同屏幕大小的网页适配。其中 rem 是通过 js 动态的设置 html 根元素的 font-size 来改变页面布局的基本单位。而 vw 本身就实现了 rem 的 js 部分。

补充：
  1. rem 和 vw 不能完全还原设计稿
  2. rem 和 vw 需要转换，设计稿都是 px 或者 pt
  3. 

### 5. 请解释什么叫『事件委托』，并且简要解释其使用场景及优缺点？

- 事件委托：将相同事件处理程序集中委托给共有的父\祖元素处理，利用事件冒泡的原理，让子元素的同一个事件冒泡到父元素上面统一处理。
- 使用场景：ul中有一系列的子元素li，这些li都有统一的点击事件跳转到各自的详情页面，并且li可能会动态的发生变化。这样就可以将所有的li的点击事件委托给ul元素。
- 优点：
  1. 减少事件注册，节省存
  2. 减少 dom 更新时，相应事件的更新
- 缺点：
  1. 不支持不冒泡的事件
  2. 如果层级过多，会出现事件冒泡被阻止、事件误判等问题

### 6. 什么叫跨域？JSONP的原理是什么？还有其他的跨域解决办法么？

- 跨域：请求访问非同源的资源就是跨域
- JSONP: JSONP是利用了 src 属性不受同源策略影响的原理。具体就是在js中定义回调函数，并将回调函数传给服务器，服务器通过植入脚本的方式在前端执行传入的回调函数，并将服务器数据作为回调函数的参数传给前端。JSONP只支持 get 。
- 其他跨域解决方案：
  1. 跨域资源共享（CORS）
  2. nginx代理跨域
  3. document.domain + iframe跨域
  4. postMessage跨域

### 7. 请讲解一下JavaScript模块加载中CMD/UMD/AMD的区别？

- CMD：一个文件就是一个模块，通过 `define` 定义一个模块，通过回调函数 require exports 在模块中进行引入和导出。异步加载、cmd 依赖就近加载。

- AMD：一个文件就是一个模块，通过 `define` 定义一个模块，与cmd就近加载不同的是amd在定义模块的时候提前声明依赖的方式对模块进行引入。

- UMD：通用模块规范，集 CommonJs、CMD、AMD 的规范于一身，根据环境以及模块的定义方式将各种模块定义转化成同一种写法。

### 8. 什么是XSS攻击，其预防方法是什么？

### 9. HTTP 301/302/304分别代表的含义是什么？

### 10. 白板题：请实现JavaScript的深复制（尽可能多的方法）

### 11. 白板题：请实现数组去重（尽可能多的方法）

#### 方法一: Set

```js
function unique(arr) {
  return Array.from(new Set(arr)) // 利用Array.from将Set结构转换成数组
}
```

#### 方法二: indexOf

```js
function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
```

#### 方法三：sort

```js
function unique(arr) {
  var formArr = arr.sort()
  var newArr = [formArr[0]]
  for (let i = 1; i < formArr.length; i++) {
    if (formArr[i] !== formArr[i - 1]) {
      newArr.push(formArr[i])
    }
  }
  return newArr
}

```

#### 方法四：创建一个对象记录已存在的元素

```js
function unique(arr) {
  var obj = {}
  var newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      obj[arr[i]] = 1
      newArr.push(arr[i])
    }
  }
  return newArr
}

```

#### 方法五：includes

```js
function unique(arr) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
```

```js
function unique(arr) {
  var newArr = []
  newArr = arr.filter(function (item) {
    return newArr.includes(item) ? '' : newArr.push(item)
  })
  return newArr
}

```

