* [贝塞尔曲线](https://cubic-bezier.com/#.17,.67,.83,.67)

* `animation`
  | 属性                      | 值                                       |
  | ------------------------- | ---------------------------------------- |
  | animation-name            | 规定需要绑定到选择器的 keyframe 名称。。 |
  | animation-duration        | 规定完成动画所花费的时间，以秒或毫秒计。 |
  | animation-timing-function | 规定动画的速度曲线。                     |
  | animation-delay           | 规定在动画开始之前的延迟。               |
  | animation-iteration-count | 规定动画应该播放的次数。                 |
  | animation-direction       | 规定是否应该轮流反向播放动画             |

* `window.requestAnimationFrame`

  window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
  >注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame()

  范例

  ```
  const element = document.getElementById('some-element-you-want-to-animate'); 
  let start;

  function step(timestamp) {
    if (start === undefined)
      start = timestamp;
    const elapsed = timestamp - start;

    // `Math.min()` is used here to make sure that the element stops at exactly 200px.
    element.style.transform = 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

    if (elapsed < 2000) { // Stop the animation after 2 seconds
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
  ```

* `window.cancelAnimationFrame`
  > 这是一个实验中的功能,此功能某些浏览器尚在开发中，请参考浏览器兼容性表格以得到在不同浏览器中适合使用的前缀。由于该功能对应的标准文档可能被重新修订，所以在未来版本的浏览器中该功能的语法和行为可能随之改变。
  
  `window.mozCancelAnimationFrame(requestID);   `