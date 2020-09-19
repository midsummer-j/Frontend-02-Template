### jsx 文件夹本周全部代码

`npm install`

`npm start`

### 1. 组件的基本知识 | 组件的基本概念和基本组成部分

- 组件是特殊的对象，特殊的模块
- 对象
  - Properties 属性
  - Methods 方法
  - Inherit 继承关系
- 组件
  - Properties 属性 从属关系
  - Methods 方法
  - Inherit 继承关系
  - Attribute 属性 强调描述
  - Config & State 配置 & 转态
  - Event 组件向外传递
  - Lifecycle 声明周期
  - Children 树形结构的必要条件

![](img/component.jpg)

- Attribute vs Property
  Attribute 强调描述性 Property 强调从属关系

  ```
    //Attribute:
    <my-component attribute=“v” />
    myComponent.getAttribute(“a”)
    myComponent.setAttribute(“a”,“value”);

    //Property:
    myComponent.a = “value”;
  ```

  ```
    <div class="cls1 cls2"></div>
    <script>
    var div = document.getElementByTagName(‘div’);
    div.className // cls1 cls2
    </script>
  ```

  ```
    <div class="cls1 cls2" style="color:blue" ></div>
    <script>
    var div = document.getElementByTagName('div');
    div.style // 对象
    </script>
  ```

  ```
    <a href="//m.taobao.com" ></div>
    <script>
    var a = document.getElementByTagName('a’);
    a.href // “http://m.taobao.com”，这个 URL 是 resolve 过的结果
    a.getAttribute(‘href’) // “//m.taobao.com”，跟 HTML 代码中完全一致
    </script>
  ```

  ```
    <input value = "cute" />
    <script>
    var input = document.getElementByTagName(‘input’); // 若 property 没有设置，
    则结果是 attribute
    input.value // cute
    input.getAttribute(‘value’); // cute
    input.value = ‘hello’; // 若 value 属性已经设置，则 attribute 不变，property 变化，
    元素上实际的效果是 property 优先
    input.value // hello
    input.getAttribute(‘value’); // cute
    </script>
  ```

- 设计组件状态
  | Markup set | JS set | JSChange | User Input Change | change |
  | :--------: | :----: | :------: | :---------------: | :-------: |
  | × | √ | √ | ？ | property |
  | √ | √ | √ | ？ | attribute |
  | × | × | × | √ | state |
  | × | √ | × | × | config |

  - property 不能被静态的标签去设置 可以被 JS 设置 可以被 JS 改变 可以被用户改变但是不建议
  - attribute 能被静态的标签去设置 可以被 JS 设置 可以被 JS 改变 可以被用户改变但是不建议
  - state 不能被静态的标签去设置 不可被 JS 设置 不可被 JS 改变 可以被用户改变
  - config 不能被静态的标签去设置 可以被 JS 设置 不可被 JS 改变 不可以被用户改变

- 生命周期
  ![](img/lifecycle.png)

- Children
  - Content 型 Children 与 Template 型 Children
  ```
    <my-button><img src=“{{icon}}”/>{{title}}</my-button>
    <my-list>
    <li><img src=“{{icon}}”/>{{title}}</li>
    </my-list>
  ```

### 2. 组件的基本知识 | 为组件添加 JSX 语法(环境搭建)(JSX 是 babel 的一个插件)

- 新建文件夹 进入终端查找文件夹
- npm init

  ```
    Press ^C at any time to quit.
    package name: (jsx)
    version: (1.0.0)
    description:
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to E:\2020GeekUniversityFrontend\PracticeEveryWeek\week12\JSX\package.json:

    {
      "name": "jsx",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }


    Is this OK? (yes)
  ```

- npm install -g webpack webpack-cli (webpack --version 4.44.1)
- npm install --save-dev webpack babel-loader
- npm install --save-dev @babel/core @babel/preset-env
- npm install --save-dev @babel/plugin-transform-react-jsx

### 3. 组件的基本知识 | JSX 的基本使用方法

### 4. 轮播组件 | 轮播组件（一）

- 安装 `npm install webpack-dev-server --save-dev`
- 安装 `npm install --save-dev webpack-cli`
- 运行 `webpack-dev-server`
- webpack.config.js 文件内容

```
module.exports = {
  entry: './main.js',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-react-jsx", { pragma: "createElement" }]]
          }
        }
      }
    ]
  },
  mode: "development"
};
```

### 5. 轮播组件 | 轮播组件（二）

- `classList`
  - add(class1, class2, ...)
    - 在元素中添加一个或多个类名。如果指定的类名已存在，则不会添加
  - contains(class)
    - 返回布尔值，判断指定的类名是否存在
  - tem(index)
    - 返回元素中索引值对应的类名。索引值从 0 开始。
  - remove(class1, class2, ...)
    - 移除元素中一个或多个类名。
    - 注意： 移除不存在的类名，不会报错。
  - toggle(class, true|false)
    - 如果该类名不存在则会在元素中添加类名
    - `document.getElementById("myDIV").classList.toggle("newClassName");`
- `background-size`
  - length
    - 设置背景图片高度和宽度。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为 auto(自动)
  - percentage
    -     将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为"auto(自动)"
  - cover
    - 此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。
  - contain
    - 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。
- `transition` `transition: property duration timing-function delay;`

  - transition-property
    - 指定 CSS 属性的 name(width|height|font-size)，transition 效果
  - transition-duration transition
    - 效果需要指定多少秒或毫秒才能完成 .3s
  - transition-timing-function
    - 指定 transition 效果的转速曲线
    - linear 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。
    - ease 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。
    - ease-in 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。
    - ease-out 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。
    - ease-in-out 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。
    - cubic-bezier(n,n,n,n) 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
  - transition-delay
    - 定义 transition 效果开始的时候
    - time 指定秒或毫秒数之前要等待切换效果开始

- `transform`
  - none 定义不进行转换。
  - matrix(n,n,n,n,n,n) 定义 2D 转换，使用六个值的矩阵。
  - matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) 定义 3D 转换，使用 16 个值的 4x4 矩阵。
  - translate(x,y) 定义 2D 转换。
  - translate3d(x,y,z) 定义 3D 转换。
  - translateX(x) 定义转换，只是用 X 轴的值。
  - translateY(y) 定义转换，只是用 Y 轴的值。
  - translateZ(z) 定义 3D 转换，只是用 Z 轴的值。
  - scale(x[,y]?) 定义 2D 缩放转换。
  - scale3d(x,y,z) 定义 3D 缩放转换。
  - scaleX(x) 通过设置 X 轴的值来定义缩放转换。
  - scaleY(y) 通过设置 Y 轴的值来定义缩放转换。
  - scaleZ(z) 通过设置 Z 轴的值来定义 3D 缩放转换。
  - rotate(angle) 定义 2D 旋转，在参数中规定角度。
  - rotate3d(x,y,z,angle) 定义 3D 旋转。
  - rotateX(angle) 定义沿着 X 轴的 3D 旋转。
  - rotateY(angle) 定义沿着 Y 轴的 3D 旋转。
  - rotateZ(angle) 定义沿着 Z 轴的 3D 旋转。
  - skew(x-angle,y-angle) 定义沿着 X 和 Y 轴的 2D 倾斜转换。
  - skewX(angle) 定义沿着 X 轴的 2D 倾斜转换。
  - skewY(angle) 定义沿着 Y 轴的 2D 倾斜转换。
  - perspective(n) 为 3D 转换元素定义透视视图

### 6. 轮播组件 | 轮播组件（三）

`MouseEvent` 接口指用户与指针设备( 如鼠标 )交互时发生的事件。使用此接口的常见事件包括：click，`dblclick`，`mouseup`，`mousedown`。

- `offsetX`、`offsetY`
  鼠标指针相对于目标节点内边位置的 X 坐标
  鼠标指针相对于目标节点内边位置的 Y 坐标

- `clientX`、`clientY`
  鼠标指针在元素（DOM）中的 X 坐标。
  鼠标指针在点击元素（DOM）中的 Y 坐标。

- `screenX` `screenY `
  鼠标指针相对于全局（屏幕）的 X 坐标；
  鼠标指针相对于全局（屏幕）的 Y 坐标；

\*`pageX` `pageY`
`pageX` 是一个由`MouseEvent`接口返回的相对于整个文档的 x（水平）坐标以像素为单位的只读属性。
`pageY`是一个只读属性，它返回触发事件的位置相对于整个 document 的 Y 坐标值。由于其参考物是整个 dom，所以这个值受页面垂直方向的滚动影响。

- `x`、`y`
  `clientX`的别名。
  `clientY`的别名。

### 7. 轮播组件 | 轮播组件（四）

`Math.sign()` 函数返回一个数字的符号, 指示数字是正数，负数还是零。

此函数共有 5 种返回值, 分别是 1, -1, 0, -0, NaN. 代表的各是正数, 负数, 正零, 负零, NaN。

```
Math.sign(3);     //  1
Math.sign(-3);    // -1
Math.sign("-3");  // -1
Math.sign(0);     //  0
Math.sign(-0);    // -0
Math.sign(NaN);   // NaN
Math.sign("foo"); // NaN
Math.sign();      // NaN
```
