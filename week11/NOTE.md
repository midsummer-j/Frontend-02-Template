### 1. proxy 与双向绑定 | proxy 的基本用法(proxy.html)

- 语法 `const p = new Proxy(target, handler)`
  - target
    - 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
  - handler
    - 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。
- 方法
  - Proxy.revocable()
  - 创建一个可撤销的 Proxy 对象。

### 2. proxy 与双向绑定 | 模仿 reactive 实现原理（一）(reactive1.html)

### 3. proxy 与双向绑定 | 模仿 reactive 实现原理（二）(reactive2.html)

### 4. proxy 与双向绑定 | 模仿 reactive 实现原理（三）(reactive3.html)

### 5. proxy 与双向绑定 | 优化 reactive(reactiveOptimization.html)

### 6. proxy 与双向绑定 | reactivity 响应式对象(reactivity.html)

### 7. 使用 Range 实现 DOM 精确操作 | 基本拖拽(rangeDrag1.html)

### 8. 使用 Range 实现 DOM 精确操作 | 正常流里的拖拽(rangeDrag2.html)

---

#### Rang

`Range` 接口表示一个包含节点与文本节点的一部分的文档片段。

可以用 `Document` 对象的 `Document.createRange` 方法创建 `Range`，也可以用 `Selection` 对象的 `getRangeAt` 方法获取 `Range`。另外，还可以通过 `Document` 对象的构造函数 `Range()` 来得到 `Range`。

[属性、方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Range)

#### Document.createRange()

```
var range = document.createRange();
//range.setStartBefore(startNode);
range.setStart(startNode, startOffset);
//range.setEndAfter(endNode);
range.setEnd(endNode, endOffset);
```

#### Range.getBoundingClientRect() [rangeGetBoundingClientReact.html]

`Range.getBoundingClientRect()` 返回一个 `DOMRect` 对象，该对象将范围中的内容包围起来；即该对象是一个将范围内所有元素的边界矩形包围起来的矩形
