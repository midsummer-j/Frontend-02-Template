## 浏览器总论

* URL
    HTTP请求，解析HTTP回应，把URL里面包含的的HTML取出来
* HTML
    对文本的HTML进行parse，文本分析，把HTML变成DOM树
* DOM
    只有HTML本身包含的信息
* DOM wit CSS
    进行CSS computing，对DOM树上对应的CSS规则，CSS规则叠加覆盖进行计算
    带CSS属性的DOM树进行layout排版
* DOM with position
    渲染render
* Bitmap
    传给显卡驱动设备才能转换成人眼可识别的光信号

![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week04/img/overall.png)

* **浏览器工作过程**
	* 浏览器首先使用 HTTP 协议或者 HTTPS 协议，向服务端请求页面；
	* 把请求回来的 HTML 代码经过解析，构建成 DOM 树；
	* 计算 DOM 树上的 CSS 属性；
	* 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图；
	* 一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度；
	* 合成之后，再绘制到界面上

* **HTTP Status code（状态码）和 Status text（状态文本）**

	* 1xx：临时回应，表示客户端请继续。
	* 2xx：请求成功。
		200：请求成功。

	* 3xx: 表示请求的目标有变化，希望客户端进一步处理。
		301&302：永久性与临时性跳转。
		304：跟客户端缓存没有更新。

	* 4xx：客户端请求错误。
		403：无权限。
404：表示请求的页面不存在。
418：It’s a teapot. 这是一个彩蛋，来自 ietf 的一个愚人节玩笑。（超文本咖啡壶控制协议）

	* 5xx：服务端请求错误。
		500：服务端错误。
		503：服务端暂时性错误，可以一会再试。

对前端来说，1xx 系列的状态码是非常陌生的，原因是 1xx 的状态被浏览器 HTTP 库直接处理掉了，不会让上层应用知晓。

2xx 系列的状态最熟悉的就是 200，这通常是网页请求成功的标志，也是大家最喜欢的状态码。
3xx 系列比较复杂，301 和 302 两个状态表示当前资源已经被转移，只不过一个是永久性转移，一个是临时性转移。实际上 301 更接近于一种报错，提示客户端下次别来了。

304 是一个每个前端必知必会的状态，产生这个状态的前提是：客户端本地已经有缓存的版本，并且在 Request 中告诉了服务端，当服务端通过时间或者 tag，发现没有更新的时候，就会返回一个不含 body 的 304 状态`

* 常见的 body 格式：
	* application/json
	* application/x-www-form-urlencoded
	* multipart/form-data
	* text/xml

## 状态机

### 一、有限状态机
* 每一个状态都是一个机器
    * 在每一个机器里，我们可以做计算、存储、输出......
    * 所有的这些机器接受的输入是一致的
    * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应
* 该是纯函数（无副作用） • 每一个机器知道下一个状态
    * 每个机器都有确定的下一个状态（Moore）
    * 每个机器根据输入决定下一个状态（Mealy）

```
//每个函数是一个状态
function state(input) //函数参数就是输入
{
//在函数中，可以自由地编写代码，处理每个状态的逻辑
return next;//返回值作为下一个状态
}
/////////以下是调用//////////
while(input) {
//获取输入
state = state(input); //把状态机的返回值作为下一个状态
}
```

### 二、使用状态机处理字符串

**在一个字符串中，找到字符”abababx”**

```
function forof(string) {
        let state = start
        for (let c of string) {
            state = state(c)
        }
        return state == end;
    }

    function start(c) {
        if (c == 'a') {
            return foundB;
        } else {
            return start;
        }
    }

    function foundB(c) {
        if (c == 'b') {
            return foundA2;
        } else {
            return start(c);
        }
    }

    function foundA2(c) {
        if (c == 'a') {
            return foundB2;
        } else {
            return start(c);
        }
    }

    function foundB2(c) {
        if (c == 'b') {
            return foundA3;
        } else {
            return start(c);
        }
    }

    function foundA3(c) {
        if (c == 'a') {
            return foundB3;
        } else {
            return start(c);
        }
    }

    function foundB3(c) {
        if (c == 'b') {
            return foundEnd;
        } else {
            return start(c);
        }
    }

    function foundEnd(c) {
        if (c == 'x') {
            return end;
        } else {
            return foundA3(c);
        }
    }

    function end(c) {
        return end;

    }
    console.log(forof('ababab1abababx'));
```

## HTTP请求

### 一、HTTP的协议解析
* ISO-OSI七层网络模型

	* 应用层
    网络服务与最终用户的一个接口。
    协议有：HTTP FTP
	* 表示层 （五层模型应用层）
	数据的表示、安全、压缩。
    格式有，JPEG、ASCll、EBCDIC、加密格式等
	* 会话层（五层模型应用层）
	建立、管理、终止会话。
    对应主机进程，指本地主机与远程主机正在进行的会话
	* 传输层
    定义传输数据的协议端口号，以及流控和差错校验。
    协议有：TCP UDP，数据包一旦离开网卡即进入网络传输层
	* 网络层
    进行逻辑地址寻址，实现不同网络之间的路径选择。
    协议有：IP（IPV4 IPV6）
	* 数据链路层

    建立逻辑连接、进行硬件地址寻址、差错校验  等功能。（由底层网络定义协议）
    将比特组合成字节进而组合成帧，用MAC地址访问介质，错误发现但不能纠正。
	* 物理层
    建立、维护、断开物理连接。（由底层网络定义协议）

	**全双工通道**不存在优先关系，但是HTTP必须由客户端发起一个request，然后服务端返回response

### 二、服务端环境准备

* POST / HTTP/1.1
    Request line

* Host: 127.0.0.1
Content-Type: application/x-www-form-urlencoded
    headers

* field1=aaa&code=x%3D1
    body

```
const http = require('http');

http.createServer((request, response) => {
    let body = [];
    request.on('error',(err) => {
        console.error(err);
    }).on('data',(chunk) =>{
        body.push(chunk.toString())
    }).on('end',()=>{
        body = Buffer.concat(body).toString();
        console.log('body:',body);
        response.writeHead(200,{'Content-T':'text/html'});
        response.end("<div style='width:200px;height:200px;background:red'>123</div>")
    })
}).listen(8080);

console.log('server started');
```
### 三、实现一个HTTP请求

* 设计一个HTTP请求的类
* content type是一个必要的字段，要有默认值
* body是KV格式
* 不同的content-type影响body的格式

### 四、send函数编写，了解response格式

* 在Request的构造器中收集必要的信息
* 设计一个send函数，把请求真实发送到服务器
* send函数应该是异步的，所以返回Promise
	![](https://raw.githubusercontent.com/midsummer-j/Frontend-02-Template/master/week04/img/response.png)
	* state line HTTP/1.1 200（HTTP状态码） OK（状态文本）
	* headers
	* body


### 五、发送请求

* 设计支持已有的connection或者自己新建connection
* 收到数据传给parser
* 根据parser的状态resolve Promise


### 六、Response解析

* Response必须分段构造，所以我们要用一个ResponseParser来“装配”
* ResponseParser分段处理ResponseText，我们用状态机来分析文本的结构

### 七、Response Body解析

* Response的body可能根据Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题
* 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式

## HTML解析

### 一、文件拆分和接口设计

* 为了方便文件管理，我们把parser单独拆到文件中
* parser接受HTML文本作为参数，返回一颗DOM树（通过parser的parseHTML方法）

### 二、FSM来实现HTML的分析

* 我们用FSM来实现HTML的分析
* 在HTML标准中，已经规定了HTML的状态
* Toy-Browser只挑选其中一部分状态，完成一个最简版本

### 三、解析标签
* 主要的标签有：开始标签，结束标签和自封闭标签`<div></div><br />`
* 在这一步我们暂时忽略属性

### 四、创建元素

* 在状态机中，除了状态迁移，我们还会要加入业务逻辑
* 我们在标签结束状态提交标签token

### 五、处理属性

* 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
* 处理属性的方式跟标签类似
* 属性结束时，我们把属性加到标签Token上

### 六、构建DOM树

* 从标签构建DOM树的基本技巧是使用栈
* 遇到开始标签时创建元素并入栈，遇到结束标签时出栈
* 自封闭节点可视为入栈后立刻出栈
* 任何元素的父元素是它入栈前的栈顶

### 七、文本节点

* 文本节点与自封闭标签类似
* 多个文本节点需要合并















