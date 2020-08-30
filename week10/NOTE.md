### 1. 使用LL算法构建AST | 四则运算
* **LL：**从左到右扫描，从左到右规约
* LL语法分析
  ```
  <Expression>::=
    <AdditiveExpression><EOF>//EOF end of file标识源代码的结束

  <AdditiveExpression>::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>
  //加法表达式等于
  //  单独的乘法表达式
  //  或者加法表达式加上乘法表达式
  //  或者加法表达式减去乘法表达式

  <MultiplicativeExpression>::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
  //乘法表达式等于
  //  单独的数字
  //  或者乘法表达式乘数字
  //  或者乘法表达式除数字

  //加法是由左右两个乘法组成
  //终结符 <+><-><*></><Number><EOF>
  ```
  以加法表达式为例：

  找到的第一个符号symbol需要将加法表达式中的乘法表达是展开，那么它可能是一个单独的乘法表达式、加法表达式或者一个数字。在以上三种情况下，如果第一个符号symbol是number或者乘法表达式不应该直接当成乘法处理，接续判断第二个输入的元素是加减还是乘除。

### 2. 使用LL算法构建AST | 正则表达式(regexp.html)
```
var regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;
// 正则里面圆括号表示捕获
var dictionary = [
  "Number",
  "Whitespace",
  "LineTerminator",
  "*",
  "/",
  "+",
  "-",
];

function tokenize(source) {
  var result = null;
  while (true) {
    result = regexp.exec(source);

    if (!result) break;

    for (var i = 1; i <= dictionary.length; i++) {
      if (result[i]) console.log(dictionary[i - 1]);
    }
    console.log(result);
  }
}

tokenize("1024 + 10 * 25");
```

### 3. 使用LL算法构建AST | LL词法分析(lexicalAnalysis.html)

```
function* tokenize(source) {
  var result = null;
  var lastIndex = 0;
  while (true) {
    lastIndex = regexp.lastIndex;
    result = regexp.exec(source);

    if (!result) break;

    if (regexp.lastIndex - lastIndex > result[0].length) break;

    let token = {
      type: null,
      value: null,
    };

    for (var i = 1; i <= dictionary.length; i++) {
      if (result[i]) token.type = dictionary[i - 1];
    }
    token.value = result[0];
    yield token;
  }
  yield {
    type: "EOF",
  };
}

for (let token of tokenize("1024 + 10 * 25")) {
  console.log(token);
}
```

### 4. 使用LL算法构建AST | LL语法分析（一）(grammaticalAnalysis1.html)

### 5. 使用LL算法构建AST | LL语法分析（二）(grammaticalAnalysis2.html)