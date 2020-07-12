## JS语言通识

### 1.泛用语言分类方法

#### 语言按语法分类

+ **非形式语言**

	+ 中文，英文

+ **形式语言**

	+ 0型: 无限制文法
```?::=?```

	+ 1型: 上下文相关文法
```?<A>?::=?<B>?```

	+ 2型: 上下文无关文法
```<A>::=?```

	+ 3型: 正则文法
```<A>::=<A>?```

### 2. 什么是产生式

#### BNF
+ 尖括号扩起的名称标示语法结构名
+ 语法结构分为基础结构和需要用其他语法结构定义的复合结构
	+ 基础结构称为终结符
	+ 复合结构称为非终结符
+ 引号和中间的字符标示终结符
+ 可以有括号
+ *表示重复多次
+ ｜表示或
+ +表示至少一次

### 3. 深入理解产生式
#### 乔姆斯基谱系
* 0型 无限制文法 --定义左右无限制
* 1型 上下文相关文法 --变化前后（上下）相同
* 2型 上下文无关文法 --左边一个非终结符右边无限制
* 3型 正则文法

JavaScript总体上属于上下文无关文法，表达式部分属于正则文法

特例：乘方右结合2\*\*1**2

### 4. 现代语言的分类
* #### 现代语言特例

	* C++中，*可能表示乘号或者指针，具体表示取决于星号前标识符是否被声明为类型

	* VB中，<可能是小于号,也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量

	* Python中，行首的tab符和空格会根据上一行的行首空白以一定的规则被处理成虚拟终结符indent或者dedent  完全非形式语言

	* JavaScript中,/可能是除号，也可能是正则表达式的开头，处理方式类似VB，字符串模板中也需要特殊处理}，还有自动插入分号规则


* #### 形式语言-用途

	* 数据描述语言
	```json html xaml sal css```

	* 编程语言
```c c++ java c# python ruby javascript```


* #### 形式语言-表达方式

	* 声明式语言
```json html xaml sal css``` 

	* 命令型语言
 ```c c++ java c# python ruby javascript```


### 5. 编程语言的性质
* ### 图灵完备性

	图灵在研究数学可计算性概念提出

	直观表述：所有可计算的问题都可用来描述的，这样的语言就是具备图灵完备性。

	固定模式产生图灵完备性：
	* 命令式-图灵机（goto,if while）
	* 声明式-lambda(递归)


* ### 动态和静态

	* #### 动态
		* 在用户的设备上/在线服务器上
		* 产品实际运行时
		* Runtime

	* #### 静态

		* 在程序员设备上
		* 产品开发时
		* Compiletime

* ### 类型系统

	*  动态类型系统 （用户） 静态类型系统 （开发）
	*  强类型 类型转换不默认发生 弱类型 （JavaScript中number+string=string；boolean=》number再和string作对比）
	*  复合类型（(T1,T2) => T3）
	*  子类型-c++ 类型转换默认行为：能用父类型的地方都能用子类型
	*  泛型 类型当成参数传递给某一段代码结构 可能是类可能是函数

	 > Array是一个接受泛型的数组
那么凡是能用Array<Parent>的地方，都能用Array<Child>
泛型是Function---协变
那么凡是能用Function<Child>的地方，
都能用Function<Parent>---逆变

### 6. 一般命令式编程语言的设计方式
* ### 一般命令式编程语言

	* #### 原子级

	原子级是一个语言的最小组成单位，包含关键字、直接量、变量名等基本单位
	例如：变量名；1234这种字符串或者数字的直接量

	* #### 表达式

	定义：原子级 + 运算符 + 辅助符号

	* #### 语句

	定义：表达式 + 特定标识符 + 特定关键字 + 特定符号 形成一定的结构

	* #### 结构化

	* #### 组织代码（npm）

## JS类型
### 1. JS类型 | Number

[双精度浮点类型](https://developer.mozilla.org/zh-CN/docs/Glossary/Number)
[双精度浮点类型计算](http://weitz.de/ieee/)

* 64比特位
	* 1 Sign 符号位
	* 11 Exponent 指数位
	* 52 Fraction 精度位
	 >[64比特位计算方式]（http://bartaz.github.io/ieee754-visualization/）
	 
* 进制
0b10二进制
0o0-7八进制
0x0-F十六

* 进制转换
	* Number.parseInt(string , radix)
这个是把字符串(只能由字母和数字组成)，这个只能是由低进制转高进制，如二进制转八进制，但是八进制不能转二进制，radix表示进制，取值2~36。
```
Number.parseInt('010',8)//8
Number.parseInt('20',2)//NaN
```

	* Number.toString(radix)
	这个函数只能将十进制数字转换为任意进制的字符串形式，同样，radix表示进制，取值2~36。
```
(10).toString(2)//"1010"转2进制
(10).toString(16)//"a" 转16进制
(1000).toString(36)//"rs" 转36进制
```

### 2. JS类型 | String

* #### Grammar

	"abc" &nbsp;'abc' &nbsp; \`abc\` &nbsp;"a'b'c"&nbsp;
\`ab\${x}abc${y}abc\`
	* `ab${
	* }abc${
	* }abc`
	* \` \`

### 3. JS类型 | 其他类型
* Boolean
	* true 
	* false
* null、undefined
	* 都表示空值
	* null 有值 关键字
	* undefined 未定义 非关键字 全局变量（早期可以赋值）

```
typeof null;//"object"

function f(){
    var undefined = 1;
    console.log(undefined);
}//1

function f(){
    var null = 0;
    console.log(null);
}//报错 Uncaught SyntaxError: Unexpected token 'null'
```
用void关键字得到undefined

## JS对象
### 10. JS对象 | 对象的基础知识

* **核心要素：状态，标识符，行为** 

	* 任何一个对象都是唯一的，这与它本身的状态无关。
	* 即使状态完全一致的两个对象，也并不相等。
	* 用状态来描述对象。
	* 状态的改变即是行为。

### 11. JS对象 | JS中的对象

#### Symbol

JavaScript属性是一个kv对。kv对，根据k找到v,k可以是两种类型，symbol和string。

JavaScript属性的值分为两种形态，第一种是数据属性，数据属性非常简单；第二种是访问器属性。

* 数据属性：
	* value：就是属性的值。
	* writable：决定属性能否被赋值。
	* enumerable：决定 for in 能否枚举该属性。
	* configurable：决定该属性能否被删除或者改变特征值。

* 访问器属性：
多数是用来描述行为的，但也会同时描述状态和行为

	![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week02/img/attribute.png)

* 原型机制

	![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week02/img/machine_made.png)

* ### Object API/Grammar

	* 提供基本的对象机制，通过语法创建对象、访问属性、定义新的属性以及改变属性的特征值，这是基本的面向对象能力。
	* 基于原型的描述对象的方法，通过Object.create在指定原型的前提下创建对象，而我们又可以去修改一个对象的原型或者获取一个对象的原型，这是基于原型对象的API。
	* 基于分类的方式描述对象，在运行时会转换成JavaScript的原型相关的访问，从语法和抽象能力上看，它是基于类的面向对象的组织方式。
	* es3
	
	![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week02/img/grammar.png)

	![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week02/img/built_in.png)

	凡是属于双括号的定义[[]]是对象的内置行为，在JavaScript代码中无法访问
