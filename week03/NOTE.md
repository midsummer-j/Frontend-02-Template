## JS表达式、JS语句以及JS结构化

### 1.JS表达式--Expressions
* #### 语法树和运算符优先级的关系
	 Grammar Tree 语法树 四则运算是按照先乘除后加减的运算法则，所以加减法在语法树的最顶端
	 
	 ![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/grammar_tree.png)
	 
	\+ \-
	\* \/
	()

* #### 表达式运算优先级
	 * **Member运算优先级最高**
	 	 * a.b --------成员访问
		 * a[b] -------成员访问 支持运行时
		 * foo`tring`
		 * super.b ----class
		 * super['b']
		 * new.target
		 * new Foo()---带括号的new比不带括号的优先级更高
		
	 * **Call 低于new和Member运算**
		 * foo() 基础的Call Expression
		 * super()
		 * foo()['b'] 降级Call Expression
		 * foo().b 降级Call Expression
		 * foo()abc 降级Call Expression
		

* #### Left hand side & Right hand side 左手和右手运算
	Left hand side在等号左边，Right hand side在等号右边
	Left hand Expression一定是Right hand Expression（在JavaScript里面没有例外）
	```
    a.b = c;  //成立
    a + b = c // 错误
    ```
	 * **Updata Expression 自增自减 不能放在等号左边**
		 * a++
		 * a--
		 * --a
		 * ++a

	 *  **Unary Expression 单目运算符**
		 * delete a.b
		 * void foo() undefined 改变语法结构
		 * typeof a
		 * +a  不会改变表达式的值，如果后边是字符串会发生类型转换
		 * -a
		 * ~a 位运算 整数按位取反，不是整数强制转换整数
		 * !a 非运算 针对布尔型的运算 两个!!把数字强制转换成布尔类型
		 * await a
	 * **Multiplicative**
        * \* / % 乘除余
	 * **Addtive**
        * \+ - 加减
	 * **Shift**
        * << >> >>> 左移 右移
	 * **elationship**
        * < > <= >= instanceof in 关系比较
		字符串字典顺序
	 * **Equality 相等**
        * == 优先把布尔型的变量转换为number类型
        * !=
        * ===
        * !==
	 * **Bitwise 位运算**
        * & ^ | 按位与 异或 按位或
	 * **Logical 逻辑运算 短路原则**
        * &&
        * ||
	 * **Conditional 三目运算符**
        * ?:

* #### Exponental 右运算符 ** 乘方
	javascript唯一一个右结合的运算符 3 \*\* 2 \*\* 3 = 3 \*\* 8

### 2.运行时的类型转换和引用类型

* #### Runtime
    * Type Convertion
    * Reference
    
* #### Type Convertion 类型转换
    ```
    false' == false // false
    ''== false      // true
    '  '== false    // true
    Number(' ')     //0
    Number('')      //0
    Number(false)   //0
    ```
    ==两边类型不同全转换为Number再进行比较，所以推荐使用===。
	
* 拆箱(Unboxing)转换
将引用类型对象转换为对应的值类型对象
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/unboxing.png)
* 装箱(Boxing)转换
把基本数据类型转化为对应的引用数据类型的操作
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/boxing.png)

### 3.JS语句--Statement

* #### Grammar
	* 简单语句   不会容纳其他语句
		*  ExpressionStatement 表达式语句 
		*  EmptyStatement      空语句 ';'
		*  DebuggerStatement   断点debugger;
		*  ThrowStatement      抛出异常 throw+空格+表达式
		* ContinueStatement    和循环语句匹配，结束单次循环，后面循环继续
		* BreakStatement       和循环语句匹配，结束单次循环，结束整个循环
		* ReturnStatement      函数中使用，返回函数值
	* 复合语句   
		* BlockStatement ｛语句列表｝单条语句变多条语句
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/block.png)
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/tag.png)
		* IfStatement  条件语句
		* SwitchStatement 多分支结构，不建议在JavaScript使用，用if代替
		* IterationStatement 代表多个语句，while，do while,for,for await
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/Iteration.png)
		* WithStatement 通过with打开一个对象，把对象所有的属性直接放进作用域
		* LabelledStatement
		* TryStatement 三段结构 try\catch\Finally
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/try.png)
	* 声明 
		* FunctionDeclaration 函数声明 4种形态 
			* function* generator声明
			* Async function 异步函数声明
			* Async function* 异步产生器
		* GeneratorDeclaration 生成器声明
		* AsyncFunctionDeclaration 异步函数声明
		* AsyncGeneratorDeclaration 异步生成器声明
		* VariableStatement 变量声明 可声明可计算
		* ClassDeclaration 类声明
		* LexicalDeclaration 词汇声明 const let
function、function*、async function、async function*、var作用范围function body，没有先后关系，当做第一行处理。
class、const、let声明之前调用报错 （建议）

* 预处理pre-process
在代码执行之前javascript引擎会对代码做预先处理,var不管是写在函数哪个位置，if里面 return之后， catch里面 finally里面都会预处理声明到函数级别。
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/pre_process.png)
* 作用域
![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/scope.png)

* #### 运行时
	* Completion Record 语句执行结果的记录
```
if(x == 1)
return 10;
```
		* [[type]]:normal,break,continue,renturn,or throw
		* [[value]]:基本类型
		* [[target]]:label
	* Lexical Environment 词汇环境 作用域

### 4.JS结构化
* #### 宏观任务
宿主发起的任务为宏观任务，如setTimeout、setInterval、setImmediate，I/O
* #### 微观任务
JavaScript引擎发起的任务为微观任务,如Promise

* #### 如何分析异步执行的顺序
	* 首先我们分析有多少个宏任务；
	* 在每个宏任务中，分析有多少个微任务；
	* 根据调用次序，确定宏任务中的微任务执行次序；
	* 根据宏任务的触发规则和调用次序，确定宏任务的执行次序；
确定整个顺序。

![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week03/img/task.png)
