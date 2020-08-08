

## 1. CSS总论 | CSS语法的研究

### CSS2.1的语法
* https://www.w3.org/TR/CSS21/grammar.html#q25.0
* https://www.w3.org/TR/css-syntax-3

### CSS产生式
* [] 代表组的概念
* ? 可以存在可以不存在
* | 或
* \* 0个或多个
* import 在charset之后其他规则之前，多个
* CDO，CDC HTML注释的起点和止点
* ruleset 普通CSS规则
* media CSS3中media query
* page 用打印的信息（浏览器不会用）
```
stylesheet
  : [ CHARSET_SYM STRING ';' ]? //@charset
    [S|CDO|CDC]* [ import [ CDO S* | CDC S* ]* ]*
    [ [ ruleset | media | page ] [ CDO S* | CDC S* ]* ]*
```

### CSS总体结构

* @charset
* @import
* rules
	* @media
	* @page
	* rule

**CSS知识结构图**

![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week06/img/css1.png)

## 2. CSS总论 | CSS @规则的研究

[@规则](https://juejin.im/post/6844903863317692424)

### At-rules
* @charset ： https://www.w3.org/TR/css-syntax-3/ 声明CSS字符集
* @import ：https://www.w3.org/TR/css-cascade-4/  级联规则
* @media ：https://www.w3.org/TR/css3-conditional/ 有条件规则
* @page ： https://www.w3.org/TR/css-page-3/ 分页媒体（打印）
* @counter-style ：https://www.w3.org/TR/css-counter-styles-3 列表前的数字或黑点
* @keyframes ：https://www.w3.org/TR/css-animations-1/ 动画
* @fontface ：https://www.w3.org/TR/css-fonts-3/ 字体
* @supports ：https://www.w3.org/TR/css3-conditional/ 兼容性不建议使用
* @namespace ：https://www.w3.org/TR/css-namespaces-3/ 命名空间

**CSS知识结构图**
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week06/img/css2.png)

## 3. CSS总论 | CSS规则的结构

selector+declaration
```
div{
	background-color:blue;
}
```
* 选择器
	* [https://www.w3.org/TR/selectors-3/](https://www.w3.org/TR/selectors-3/)
	* [https://www.w3.org/TR/selectors-4/  制定中](https://www.w3.org/TR/selectors-4/) 
* 声明
	* Key
    * Properties 声明属性
		* Variables: [https://www.w3.org/TR/css-variables/ 属性和变量](https://www.w3.org/TR/css-variables/)
	* Value
		* [https://www.w3.org/TR/css-values-4/](https://www.w3.org/TR/css-values-4/)

### 标准
    
* selectors-3
    
    产生式
    ```
    selectors_group  //产生式根元素
  	  : selector [ COMMA S* selector ]* //COMMA逗号 优先级最低
  	  ;
      
     selector
  	   : simple_selector_sequence [ combinator simple_selector_sequence ]*
  	   ;

	 combinator
  		/* combinators can be surrounded by whitespace */
  		: PLUS S* | GREATER S* | TILDE S* | S+  //PLUS+， GREATER>， TILDE~ ，空格
  		;
        
      simple_selector_sequence //简单选择器
        : [ type_selector | universal ]  //类型选择器|* 在最前
          [ HASH | class | attrib | pseudo | negation ]* //# . [] : :not
        | [ HASH | class | attrib | pseudo | negation ]+
      ;
    ```
* selectors-4 增加了很多伪类选择器 状态：W3C Working Draft

* Key

  ```
  :root {
    --main-color: #06c;
    --accent-color: #006;
  }
  /* The rest of the CSS file */
  #foo h1 {
    color: var(--main-color);
  }
  /*默认值*/
  .component .header {
    color: var(--header-color, blue);
  }
  .component .text {
    color: var(--text-color, black);
  }
  /*用作key*/
  .foo {
    --side: margin-top;
    var(--side): 20px;
  }
  /*替换后成为无效值*/
  :root { --not-a-color: 20px; }
  p { background-color: red; }
  p { background-color: var(--not-a-color); }
  ```
* css-values-4
  ```
  /*进行简单计算*/
  :root {
    font-size: calc(100vw / 35);
  }
   /*让CSS的值和元素属性绑定*/
  Attribute References: attr()
  ```
  
**CSS知识结构图**
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week06/img/css3.png)


## 4. CSS总论 | 收集标准

收集第一步： 进入https://www.w3.org/TR/

收集第二步： 打开控制台输入以下代码并复制结果
  ```
  JSON.stringify(Array.prototype.slice.call(document.querySelector("#container").children).filter(
      e => e.getAttribute("data-tag").match(/css/)).map(e => ({
      name: e.children[1].innerText,
      href: e.children[1].children[0].href
  })))//结果为数组
  ```
  
  收集第三步： 将结果命名`var standards = `
  
  收集第四步： 获取第二步结果页面里面的数据
    ```
    let iframe = document.createElement('iframe');
	document.body.innerHTML = "";
    document.body.append(iframe);

    function happen(element,event){
        return new Promise(function (resolve) {
            let handler = () =>{
                setTimeout(()=>{resolve();},2001)
                element.removeEventListener(event,handler)
            }
            element.addEventListener(event,handler)
        });
    }

    void async function () {
        for (let standard of standards) {
            iframe.src = standard.href;
            console.log(standard.name);
            await happen(iframe,"load")
            console.log(iframe.contentDocument.querySelector(".propdef"));
        }
    }()
    // if (getCookie('hide-obsolescence-warning') == '1') setTimeout(removeWIP, 2000);访问次数过多
    ```
    
## 5. CSS总论 | CSS总论总结
    
## 6. CSS选择器 | 选择器语法
    
* ### 简单选择器
  * \*  通用选择器
  * div svg|a  
  	type selector 选择的是tagName属性  命名空间：HTML SVG MathML
  * .cls class 空白分隔符
  * #id  id
  * [attr=value]  
  	属性选择器，囊括了class属性选择器id选择器  
    attr = value  name = 值 
    等号之前加~，表示像class一样支持拿空格分隔的值得序列
    等号之前加|，表示这个属性以这个值开头即可
  * :hover伪类，元素特殊状态
  * ::before 伪元素以双冒号开头，提倡双冒号，这可以更好的分别伪类和伪元素
    
* ### 复合选择器 `combined`
  * <简单选择器><简单选择器><简单选择器> 
  * \* 或者 div 必须写在最前面
  
* ### 复杂选择器
  * <复合选择器><sp><复合选择器> 子孙选择器
  * <复合选择器>">"<复合选择器> 父子选择器
  * <复合选择器>"~"<复合选择器> 
  * <复合选择器>"+"<复合选择器>
  * <复合选择器>"||"<复合选择器> 选中某一列

## 7. CSS选择器 | 选择器的优先级
  
* 简单选择器计数
  ```
  #id div.a#id {
  //......
  } 1 2
  [0, 2, 1, 1]
  S = 0 * N³+ 2 * N²+ 1 * N¹+ 1 取N = 1000000
  S = 2000001000001
  ```

// 选择器优先级
div#a.b .c[id=x]   [0,1,3,1]
#a:not(#b)         [0,2,0,0]
*.a                [0,0,1,0]
div.a              [0,0,1,1]
  ```
  // https://www.w3.org/TR/CSS2/cascade.html#specificity
  // [a,b,c,d]
  // 1、如果样式声明来源于style属性则a=1;
  // 2、ID属性的数量 = b;
  // 3、其他属性和伪类的数量 = c;
  // 4、元素名称和伪元素的数量 = d;
  // 5、如果将id作为属性选择器[id = p33]那么优先级为[0,0,1,0];
  // 6、:not(), 虽然它本身是不计权重的, 但是写在它里面的 css selector 是需要计算权重的
  Some examples:

   *             {}  // a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 
   li            {}  // a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 
   li:first-line {}  // a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 
   ul li         {}  // a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 
   ul ol+li      {}  // a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 
   h1 + *[rel=up]{}  // a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 
   ul ol li.red  {}  // a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 
   li.red.level  {}  // a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 
   #x34y         {}  //a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 
   style=""          // a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 
  ```

## 8. CSS选择器 | 伪类
  
* 链接/行为
  * :any-link  任何超链接
  * :link :visited
  
  	还没有访问 已经访问
  
  	:link :visited使用过后无法更改文字颜色以外的属性
  * :hover  鼠标移入
  * :active  激活状态
  * :focus  焦点
  * :target  链接到当前目标
  

* 树结构
  * :empty  是否有子元素
  * :nth-child()  
  
  	父元素的第几个子元素
  
  	支持一种语法 even odd 奇偶 3n+1 4n-1
  * :nth-last-child()  从后往前
  * :first-child :last-child :only-child  
  	第一个子元素 最后一个子元素 只有一个子元素
  

* 逻辑型
  * :not伪类 复合选择器
  * :where :has

  
  
## 9. CSS选择器 | 伪元素

* ::before ::after 元素内容前后插入伪元素
* ::first-line 选中第一行
* ::first-letter 选中第一个字母

```<div>
<::before/>
content content content content
content content content content
content content content content
content content content content
content content content content
content content content content
<::after/>
</div>

<div>
<::first-letter>c</::first-letter> content content content content
content content content content
content content content content
content content content content
content content content content
content content content content
</div>
伪元素
<div>
<::first-line>content content content content </::first-line> 
content content content content
content content content content
content content content content
content content content content
content content content content
</div>
```

### 思考

**为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？**

first-line 是针对第一行设置的样式，但是根据屏幕的大小第一行的内容不是固定的，所以对第一行不能进行脱离文本流处理。