学习笔记## 1. 重学HTML | HTML的定义：XML与SGML

* **ML**

  * XML 指的是标记语言：Markup language。
  
* **SGML**

  * XML 指的是标准通用标记语言：Standard Generalized Markup language。
  * 正式的，能允许验证文档的正确性。
  * 结构化的，能够处理复杂的文档。
  * 可扩充的，能够支持大型信息存储的管理。
  
* **XML**

  * XML 指的是可扩展标记语言：eXtensible Markup Language。
  * XML 是一种很像HTML的标记语言。
  * XML 的设计宗旨是传输数据，而不是显示数据。
  * XML 标签没有被预定义。您需要自行定义标签。
  * XML 被设计为具有自我描述性。
  * XML 是 W3C 的推荐标准。

* **HTML**
  * HTML 指的是超文本标记语言: HyperText Markup Language。
  * HTML 不是一种编程语言，而是一种标记语言。
  * 标记语言是一套标记标签 (markup tag)。
  * HTML 使用标记标签来描述网页。
  * HTML 文档包含了HTML 标签及文本内容。
  * HTML文档也叫做 web 页面。

* **HTML5**

  HTML5 是下一代 HTML 标准。
  
  HTML , HTML 4.01的上一个版本诞生于 1999 年。自从那以后，Web 世界已经经历了巨变。
  
  HTML5 仍处于完善之中。然而，大部分现代浏览器已经具备了某些 HTML5 支持。
  
XML 被设计用来传输和存储数据。

HTML 被设计用来显示数据。

* DTD与namespace
  * http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd，DTD
    ```
    <!ENTITY % HTMLlat1 PUBLIC
       "-//W3C//ENTITIES Latin 1 for XHTML//EN"
       "xhtml-lat1.ent">
    %HTMLlat1;

    <!ENTITY % HTMLsymbol PUBLIC
       "-//W3C//ENTITIES Symbols for XHTML//EN"
       "xhtml-symbol.ent">
    %HTMLsymbol;

    <!ENTITY % HTMLspecial PUBLIC
       "-//W3C//ENTITIES Special for XHTML//EN"
       "xhtml-special.ent">
    %HTMLspecial;
    ```
    * http://www.w3.org/TR/xhtml1/DTD/xhtml-lat1.ent（字符实体集 nbsp）
    * http://www.w3.org/TR/xhtml1/DTD/xhtml-special.ent（XHTML的特殊字符 amp‘&’ lt‘<’ gt‘>’）
    * http://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent（XHTML的数学、希腊语和符号字符）
  * http://www.w3.org/1999/xhtml
  
  
## 2. 重学HTML | HTML标签语义

[HTML标签语义](https://juejin.im/post/6861546747819851783)

## 3. 重学HTML | HTML语法
HTML中合法元素写法一共有6种
* Element: <tagname\>...</tagname\> 
* Text: text
* Comment: <!-- comments --\> 
* DocumentType: <!Doctype html>
* ProcessingInstruction: <?a 1?>
* CDATA:<![CDATA[ ]]>

**字符引用**

* &amp;#161--&#161; 
* &amp;amp--&amp;
* &amp;lt------&lt; 
* &amp;quot---&gt;


## 4. 浏览器API | DOM API

[DOM API](https://juejin.im/post/6861546747819851783)

![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week08/img/node.jpg)

* 导航类操作
  * parentNode
  * childNodes
  * firstChild
  * lastChild
  * nextSibling
  * previousSibling
  * parentElement
  * children
  * firstElementChild
  * lastElementChild
  * nextElementSibling
  * previousElementSibling

* 修改操作
  * appendChild
  * insertBefore
  * removeChild
  * replaceChild

* 高级操作
  * compareDocumentPosition 是一个用于比较两个节点中关系的函数。
  * contains 检查一个节点是否包含另一个节点的函数
  * isEqualNode 检查两个节点是否完全相同。
  * isSameNode 检查两个节点是否是同一个节点，实际上在JavaScript 中可以用“===”。 
  * cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。

## 5. 浏览器API | 事件API

* **EventTarget.addEventListener()** 方法将指定的监听器注册到 EventTarget 上，当该对象触发指定的事件时，指定的回调函数就会被执行。

  * 语法
> target.addEventListener(type, listener, options);  
target.addEventListener(type, listener, useCapture);  
target.addEventListener(type, listener, useCapture, wantsUntrusted  );  // Gecko/Mozilla only

  * 参数

    `type`

      表示监听事件类型的字符串。

    `listener`

      当所监听的事件类型触发时，会接收到一个事件通知（实现了 Event 接口的对象）对象。listener 必须是一个实现了 EventListener 接口的对象，或者是一个函数。。

    `type`

      一个指定有关 listener 属性的可选参数对象。可用的选项如下：

    capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。

    once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。

    passive: Boolean，设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。查看 使用 passive 改善的滚屏性能 [了解更多](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E4%BD%BF%E7%94%A8_passive_%E6%94%B9%E5%96%84%E7%9A%84%E6%BB%9A%E5%B1%8F%E6%80%A7%E8%83%BD)。

     mozSystemGroup: 只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。

    ```
	a.addEventListener('click', function () {
        console.log('a');
    })
    b.addEventListener('click', function () {
        console.log('b');
    })
	//b
	//a
	```
	```
	a.addEventListener('click', function () {
        console.log('a');
    })
    b.addEventListener('click', function () {
        console.log('b');
    })
	a.addEventListener('click', function () {
        console.log('a1');
    },true)
    b.addEventListener('click', function () {
        console.log('b1');
    },true)
	//a
	//b
	//b1
	//a1
	```
	```
	a.addEventListener('click', function () {
        console.log('a');
    })
    b.addEventListener('click', function () {
        console.log('b');
    })
	a.addEventListener('click', function () {
        console.log('a1');
    },true)
    b.addEventListener('click', function () {
        console.log('b1');
    },true)
	b.addEventListener('click', function () {
        console.log('b2');
    })
	//a
	//b
	//b1
	//a1
	//b2
	```
    
## 6. 浏览器API | Range API
~~iterator迭代器API设计风格老旧（淘汰）~~
`Range` 接口表示一个包含节点与文本节点的一部分的文档片段。

可以用 Document 对象的 Document.createRange 方法创建 Range，也可以用 Selection 对象的 getRangeAt 方法获取 Range。另外，还可以通过 Document 对象的构造函数 Range() 来得到 Range。

* **属性**

  * [Range.collapsed](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/collapsed) 只读

    返回一个表示 Range 的起始位置和终止位置是否相同的布尔值。
  * [Range.commonAncestorContainer](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/commonAncestorContainer) 只读

    返回完整包含 startContainer 和 endContainer 的、最深一级的节点。
  * [Range.endContainer](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/endContainer) 只读

    返回包含 Range 终点的节点。
  * [Range.endOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/endOffset) 只读

    返回一个表示 Range 终点在 endContainer 中的位置的数字。
  * [Range.startContainer](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/startContainer) 只读

    返回包含 Range 开始的节点。
  * [Range.startOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/startOffset) 只读

    返回一个表示 Range 起点在 startContainer 中的位置的数字。

* **构造器**
  * [Range() ](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/Range)
返回一个以全局（global） Document 作为起点与终点的 Range 对象。

* **方法**

  该接口没有继承的方法。

  * 定位方法

    * Range.setStart()
    设置 Range 的起点。
    * Range.setEnd()
    设置 Range 的终点。
    * Range.setStartBefore()
    以其它节点为基准，设置 Range 的起点。
    * Range.setStartAfter()
    以其它节点为基准，设置 Range 的起点。
    * Range.setEndBefore()
    以其它节点为基准，设置 Range 的终点。
    * Range.setEndAfter()
    以其它节点为基准，设置 Range 的终点。
    * Range.selectNode()
    使 Range 包含某个节点及其内容。
    * Range.selectNodeContents()
    使 Range 包含某个节点的内容。
    * Range.collapse()
    将 Range 折叠至其端点（boundary points，起止点，指起点或终点，下同）之一。
  * 编辑方法

    通过以下方法，可以从 Range 中获得节点，改变 Range 的内容。

     * Range.cloneContents()
    返回一个包含 Range 中所有节点的文档片段。
     * Range.deleteContents()
    从文档中移除 Range 包含的内容。
     * Range.extractContents()
    把 Range 的内容从文档树移动到一个文档片段中。
     * Range.insertNode()
    在 Range 的起点处插入一个节点。
     * Range.surroundContents()
    将 Range 的内容移动到一个新的节点中。

  * 其他方法

    * Range.compareBoundaryPoints()
    比较两个 Range 的端点。
    * Range.cloneRange()
    返回拥有和原 Range 相同的端点的克隆 Range 对象。
    * Range.detach()
    将 Range 从使用状态中释放，改善性能。
    * Range.toString()
    把 Range 的内容作为字符串返回。

  * [更多](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)

## 7. 浏览器API | CSSOM
document.styleSheets

![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week08/img/styleSheets.jpg)

* Rules 
  * document.styleSheets[0].cssRules

	  返回一个实时的 CSSRuleList，其中包含组成样式表的 CSSRule 对象的一个最新列表。
	  > styleSheet.cssRules[i] // where i = 0..cssRules.length-1

  * document.styleSheets[0].insertRule("p { color:pink; }", 0)
    stylesheet.insertRule(rule [, index])

    * `rule`
	  一个包含了将要插入的规则的 DOMString。规则字符串必须包含的内容取决于它的类型：
      * [rule-sets](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_statements) 类型（普通带有选择器的规则），需要选择器和样式声明；
      * [at-rules](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule) 类型（以 @ 开头的规则，如 @import, @media 等），需要 at-identifier 和规则内容。
		* `index `一个小于或等于 stylesheet.cssRules.length 的正整数，表示新插入的规则在CSSStyleSheet.cssRules 中的位置。默认值是 0。
  * ~~document.styleSheets[0].removeRule(0)~~（**遗留方法，应尽量避免使用**）

   与deleteRule()功能相同；从样式表的规则列表的特定位置中移除规则。
	* document.stylesheets[0].deleteRule(index) 
* [Rule](https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule)
  * CSSStyleRule
  * CSSCharsetRule
  * CSSImportRule
  * CSSMediaRule
  * CSSFontFaceRule
  * CSSPageRule
  * CSSNamespaceRule
  * CSSKeyframesRule
  * CSSKeyframeRule
  * CSSSupportsRule
  * ......

* **CSSStyleRule**表示一条 CSS 样式规则 
  * CSSStyleRule.selectorText
返回这条规则的、文本格式的选择器，例如 "h1,h2"。

  ```
  document.styleSheets[0].rules[0].selectorText
  ```

  * CSSStyleRule.style
  
  ```
  
  document.styleSheets[0].rules[0].style.backgroundColor = 'black';
  ```

* getComputedStyle
  * 语法：`let style = window.getComputedStyle(element, [pseudoElt]);`
    * `element`用于获取计算样式的`Element`。
    * `pseudoElt` 可选,指定一个要匹配的伪元素的字符串。必须对普通元素省略（或null）。
	  ```
	  getComputedStyle(document.querySelector('div'),'::after').color

	  getComputedStyle(document.querySelector('div'),'::after').content
	  ```

## 8. 浏览器API | CSSOM View

* window
  * window.innerHeight, window.innerWidth（浏览器实际渲染使用的区域）
  * window.outerWidth, window.outerHeight（包含浏览器自带工具栏）
  * window.devicePixelRatio（显示设备的物理像素分辨率与CSS像素分辨率之比）
  * window.screen
    * window.screen.width（返回屏幕的宽度）
    * window.screen.height（以像素为单位返回屏幕的高度。）
    * window.screen.availWidth（回屏幕左边边界的第一个像素点）
    * window.screen.availHeight

* window.open("about:blank", "_blank","width=100,height=100,left=100,right=100" )
  * moveTo(x, y)
  * moveBy(x, y)
  * resizeTo(x, y)
  * resizeBy(x, y)
```
	<button onclick="window.w = window.open('about:blank','_blank','width=100,height=100,left=100,top=100')">window.open</button>
    <button onclick="w.resizeBy(30,30)">resizeBy+</button>
    <button onclick="w.resizeBy(-30,-30)">resizeBy-</button>
    <button onclick="w.moveBy(30,30)">moveBy+</button>
    <button onclick="w.moveBy(-30,-30)">moveBy-</button>
```

* scroll
  * scrollTop Element.scrollTop 属性可以获取或设置一个元素的内容垂直滚动的像素数。
  * scrollLeft Element.scrollLeft 属性可以读取或设置元素滚动条到元素左边的距离
  * scrollWidth 这个只读属性是元素内容宽度的一种度量，包括由于overflow溢出而在屏幕上不可见的内容。
  * scrollHeight 这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。
  * scroll(x, y) 已废弃。 该方法已经使用了 scrollTo() 方法来替代。
  * scrollTo(x,y) 把内容滚动到指定的坐标。
  * scrollBy(x, y) 按照指定的像素值来滚动内容
  * scrollIntoView() 当前的元素滚动到浏览器窗口的可视区域内。
  * window
	  * scrollX  返回文档/页面水平方向滚动的像素值。
	  * scrollY   返回文档在垂直方向已滚动的像素值。

     * scroll(x, y)  

     * scrollBy(x, y)

* layout
  * getClientRects()

  返回一个指向客户端中每一个盒子的边界矩形的矩形集合。

  * getBoundingClientRect()  

  Element.getBoundingClientRect() 方法返回元素的大小及其相对于视口的位置。

  ```
  <body>
      <div style="width: 100px;height: 500px;">
          文字 <span class="x" style="background-color: lightblue;">文字 文字 文字 文字 文字 文字 文字 文字  文字 </span>
          </div>
  </body>
  <script>
      let x = document.getElementsByClassName('x')[0];

      console.log('getClientRects' ,x.getClientRects());
      console.log('getBoundingClientRect' ,x.getBoundingClientRect());
  </script>
  ```
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week08/img/showResult.jpg)
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week08/img/showResult1.jpg)

## 9. 浏览器API | 其它API

* 标准化组织
	* khronos
		* WebGL
	* ECMA
		* ECMAScript
	* WHATWG
		* HTML
	* W3C
		* webaudio
		* CG/WG

<!--* 第一步 首先调用 `Object.getOwnPropertyNames(window)` js里面所有的API

  * -->














<!--
name   | age
----       | ---
LearnShare | 12
Mike       |  32 -->

