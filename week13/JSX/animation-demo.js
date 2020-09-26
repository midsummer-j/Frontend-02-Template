import { Timeline, Animation } from './animation.js'
import { ease, easeIn, easeInOut } from './ease.js'

let tl = new Timeline()

tl.start();
// console.log(document.querySelector("#el").style);
tl.add(new Animation(document.querySelector("#el").style, "transform", 0, 500, 2000, 0, easeIn, v => `translateX(${v}px)`))

document.querySelector("#el2").style.transition = 'transform ease-in 2s'
document.querySelector("#el2").style.transform = 'translateX(500px)'

document.querySelector("#pause").addEventListener("click", () => {
  tl.pause()

})
document.querySelector("#resume").addEventListener("click", () => {
  tl.resume()
})
// document.querySelector("#reset").addEventListener("click", () => {
//   tl.reset()
// })
