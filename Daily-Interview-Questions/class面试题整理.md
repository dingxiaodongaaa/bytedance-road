
## 第一组
> 难度：三星
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

