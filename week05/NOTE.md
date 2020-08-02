## 1. CSS计算 | 收集CSS规则

* ### 环境准备
	* `npm install css`

* ### 收集CSS规则
	* 遇到style标签时，我们把CSS规则保存起来
	* 这里我们调用CSS Parser来分析CSS规则
	* 这里我们必须要仔细研究此库分析CSS规则的格式

## 2. CSS计算 | 添加调用

* 当我们创建一个元素后，立即计算CSS
* 理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
* 在真实浏览器中，可能遇到写在body的style标签，需要重新CSS计算的情况，这里我们忽略


## 3. CSS计算 | 获取父元素序列

* 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
* 我们从上一步骤的stack，可以获取本元素所有的父元素
* 因为我们首先获取的是“当前元素”，所以我们获得和计算父元素匹配的顺序是从内向外

`var elements = stack.slice().reverse();`

> 1、用栈构建DOM树的过程中整个stack里面存储了所有当前元素的父元素
2、slice 栈是不断变化的，随着后续解析，栈里面的元素会发生变化，可能被污染，
3、不传参默认复制数组
4、reverse 标签匹配从当前元素往外匹配，首先获取当前元素
5、检查一个选择器是否匹配当前元素，需要一级一级往父元素去找
6、选择器也要从当前元素向外排列
7、复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

## 4. CSS计算 | 选择器与元素的匹配

* 选择器也要从当前元素向外排列
* 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

## 5. CSS计算 | 计算选择器与元素匹配

* 根据选择器的类型和元素属性，计算是否与当前元素匹配

## 6. CSS计算 | 生成computed属性

* 一旦选择匹配，就应用选择器到元素上，形成computedStyle

## 7. CSS计算 | specificity的计算逻辑

* CSS规则根据specificity和后来优先规则覆盖
* specificity是个四元组，越左边权重越高
* 一个CSS规则的specificity根据包含的简单选择器相加而成

inline, id, class, tagname

[0（行内样式）, 0（id选择器）, 0（类选择器）, 0（标签选择器）]

`div div .div`[0（行内样式）, 0（id选择器）, 1（类选择器）, 2（标签选择器）]
<
`div div div .div`[0（行内样式）, 0（id选择器）, 1（类选择器）, 3（标签选择器）]

## 8. 排版 | 根据浏览器属性进行排版
css三代排版技术

* `position` `display` `float` 正常流
* `flex`是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
* `grid`

任何一个容器都可以指定为 Flex 布局，但是设置之后子元素的`float`、`clear`和`vertical-align`属性将失效。
`.box{
  display: flex;
}`

行内元素
`.box{
  display:inline-flex;
}`

* 容器的属性
	* `flex-direction` 决定主轴方向`row | row-reverse | column | column-reverse`;
		* `row` 从左到右
		* `row-reverse` 从右到左
		* `column` 从上到下
		* `column-reverse` 从下到上

	* `flex-wrap` 如果一条轴线排不下，如何换行。`nowrap | wrap | wrap-reverse;`
		* `nowrap`（默认）：不换行。
		* `wrap` 换行，第一行在上方。
		* `wrap-reverse` 换行，第一行在下方。

	* `flex-flow` `flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

	* `justify-content` 定义了项目在主轴上的对齐方式。`flex-start | flex-end | center | space-between | space-around;`
		 * `flex-start`（默认值）：左对齐
		 * `flex-end`：右对齐
		 * `center`： 居中
		 * `space-between`：两端对齐，项目之间的间隔都相等。
		 * `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

	* `align-items` 定义项目在交叉轴上如何对齐。`flex-start | flex-end | center | baseline | stretch;`
		* `flex-start`：交叉轴的起点对齐。
		* `flex-end`：交叉轴的终点对齐。
		* `center`：交叉轴的中点对齐。
		* `baseline`: 项目的第一行文字的基线对齐。
		* `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

	* `align-content` 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。`flex-start | flex-end | center | space-between | space-around | stretch;`
		* `flex-start`：与交叉轴的起点对齐。
		* `flex-end`：与交叉轴的终点对齐。
		* `center`：与交叉轴的中点对齐。
		* `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
		* `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
		* `stretch`（默认值）：轴线占满整个交叉轴。


**以下排版以flex为例**



## 9. 排版 | 收集元素进行

* 根据主轴尺寸，把元素分进行
* 若设置了`no-wrap`，则强行分配进第一行

## 10. 排版 | 计算主轴

* 找出所有`flex`元素
* 把主轴方向的剩余尺寸按比例分配给这些元素
* 若剩余空间为负数，所有`flex`元素为0，等比压缩剩余元素

## 11. 排版 | 计算交叉轴

* 根据每一行中最大元素尺寸计算行高
* 根据行高`flex-align`和`tem-align`，确
* 定元素具体位置

## 12. 渲染 | 绘制单个元素

* 绘制需要依赖一个图形环境
* 我们这里采用了npm包images
* 绘制在一个viewport上进行
* 与绘制相关的属性：`background-color、border、background-image`等

## 13. 渲染 | 绘制DOM树

* 递归调用子元素的绘制方法完成DOM树的绘制
* 忽略一些不需要绘制的节点
* 实际浏览器中，文字绘制是难点，需要依赖字体库，忽略
* 实际浏览器中，还会对一些图层做compositing，忽略