import { Component, createElement } from './framework'
import { Carousel } from './carousel.js'
import { Timeline, Animation } from './animation.js'



// document.body.appendChild(a)
let d = [
  'https://placehold.it/1142x640/00ff00?text=img1',
  'https://placehold.it/1142x640/ffff00?text=img2',
  'https://placehold.it/1142x640/ff0000?text=img3',
  'https://placehold.it/1142x640/ff00ff?text=img4'
]

let a = <Carousel src={d} />
a.mountTo(document.body)

// let tl = new Timeline()
// window.tl = tl
// window.animation = new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null)
// tl.add(new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null))

tl.start();