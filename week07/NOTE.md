### 1. CSS排版 | 盒

```
HTML代码中可以书写开始___标签_，结束__标签__ ，和自封闭__标签__ 。

一对起止__标签__ ，表示一个__元素__ 。

DOM树中存储的是__元素__和其它类型的节点（Node）。

CSS选择器选中的是__元素__ 。

CSS选择器选中的__元素__ ，在排版时可能产生多个__盒__ 。

排版和渲染的基本单位是__盒__ 。
```

![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/box.jpg)
```
box-sizing： 
	content-box
	border-box

box-sizing: content-box 是W3C盒子模型
box-sizing: border-box 是IE盒子模型

box-sizing的默认属性是content-box
```
* 标准盒模型
> 在标准的盒模型中，width指content部分的宽度
* IE盒模型
> 在IE盒模型中，width表示content+padding+border这三个部分的宽度

* border


### 2. CSS排版 | 正常流
> 正常流的排版行为：依次排列，排不下了换行。

* 正常流排版
	* 收集盒进行
	* 计算盒在行中的排布
	* 计算行的排布

### 3. CSS排版 | 正常流的行级排布
行模型
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/ifc.jpg)

行内盒inline-block基线是随着里面的文字去变化的


### 4. CSS排版 | 正常流的块级排布
* float
>  先把这个元素排在特定位置，当它是正常流里面的元素，在看float朝哪个方向，原来的内容位置根据float进行改变。

* clear

块模型
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/bfc.jpg)

* margin 折叠
> 只发生在正常流的块级排布里面


### 5. CSS排版 | BFC合并

**BFC:**Block Formatting Context 块级格式上下文

* Block Container：里面有BFC的 /*能容纳正常流的盒，里面就有BFC，想想有哪些？*/
    * block
    * inline-block
    * table-cell
    * flex item
    * grid cell
    * table-caption
* Block-level Box：外面有BFC的 
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/Block_levelBox.jpg)
* Block Box = Block Container + Block-level Box：里外都有BFC的


### 6. CSS排版 | Flex排版

* 收集盒进行
  * 分行
    * 根据主轴尺寸，把元素分进行
    * 若设置了no-wrap，则强行分配进第一行
* 计算盒在主轴方向的排布
  * 计算主轴方向
  	* 找出所有Flex元素
    * 把主轴方向的剩余尺寸按比例分配给这些元素
    * 若剩余空间为负数，所有flex元素为0，
等比压缩剩余元素
* 计算盒在交叉轴方向的排布
  * 计算交叉轴方向
    * 根据每一行中最大元素尺寸计算行高
    * 根据行高flex-align和item-align，确定元素具体位置

### 7. CSS动画与绘制 | 动画

* Animation
  * animation-name 时间曲线
  * animation-duration 动画的时长；
  * animation-timing-function 动画的时间曲线；
  * animation-delay 动画开始前的延迟；
  * animation-iteration-count 动画的播放次数；
  * animation-direction 动画的方向。

* Transition
  * transition-property 要变换的属性；
  * transition-duration 变换的时长；
  * transition-timing-function 时间曲线；
  * transition-delay 延迟。

* cubic-bezier 贝塞尔曲线

  https://cubic-bezier.com/#.39,1.65,.71,1.21

  一次贝塞尔插值公式
	![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/bezier.jpg)

  二次贝塞尔插值公式
 	![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/bezier2.jpg)

  三次贝塞尔插值公式
	![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/bezier3.jpg)

### 8. CSS动画与绘制 | 颜色
* **RGB 颜色**

	在计算机中，最常见的颜色表示法是 RGB 颜色，**它符合光谱三原色理论：红、绿、蓝三种颜色的光可以构成所有的颜色。**
    ![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/rgb.jpg)

    人类的视神经系统相关，人类的视觉神经分别有对红、绿、蓝三种颜色敏感的类型。

现代计算机中多用 0 - 255 的数字表示每一种颜色，这正好占据了一个字节，每一个颜色就占据三个字节。

* **CMYK 颜色**

	品红、黄、青、黑。
    ![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/cmyk.jpg)

* **HSL 颜色**

	色相（H）、纯度（S）和明度（L）
    ![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week07/img/hsl.jpg)

* **其它颜色**

	RGBA 是代表 Red（红色）、Green（绿色）、Blue（蓝色）、Alpha 通道被用于透明度

* **渐变**
    * 线性渐变`linear-gradient(direction, color-stop1, color-stop2, ...);`

      direction 可以是方向，也可以是具体的角度
      `to bottom`
      `to top`
      `to left`
      `to right`
      `to bottom left`
      `to bottom right`
      `to top left`
      `to top right`
      `120deg`
      `3.14rad`

      color-stop 是一个颜色和一个区段
      `rgba(255,0,0,0)`
      `orange`
      `yellow 10%`
      `green 20%`
      `lime 28px`

    * 金色
    ```
    <style>
    #grad1 {
        height: 200px;
        background: linear-gradient(45deg, gold 10%, yellow 50%, gold 90%); 
    }
    </style>
    <div id="grad1"></div>
    ```

### 9. CSS动画与绘制 | 绘制

* 几何图形
  * border
  * box-shadow
  * border-radius
* 文字
  * font
  * text-decoration
* 位图
  * background-image