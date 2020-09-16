import { Component, createElement } from './framework'

class Carousel extends Component {
  constructor() {
    super()
    this.attributes = Object.create(null)
  }
  setAttribute(name, value) {
    this.attributes[name] = value

  }
  render() {
    this.root = document.createElement('div');
    this.root.classList.add("carousel", "li")
    for (let record of this.attributes.src) {
      let child = document.createElement('div');
      child.style.backgroundImage = `url('${record}')`;
      this.root.appendChild(child);
    }

    let position = 0;
    this.root.addEventListener("mousedown", event => {
      let children = this.root.children;
      // 鼠标起始点
      let startX = event.clientX//startY = event.clientY

      let move = event => {

        let x = event.clientX - startX// y = event.clientY - startY
        // console.log(event);
        let current = position - ((x - x % 500) / 500)

        for (let offset of [-1, 0, 1]) {
          let pos = current + offset;
          pos = (pos + children.length ** 2) % children.length


          children[pos].style.transition = "none"
          children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`
        }

      }

      let up = event => {
        let x = event.clientX - startX

        position = position - Math.round(x / 500)

        for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
          let pos = position + offset;
          pos = (pos + children.length ** 2) % children.length


          children[pos].style.transition = "none"
          children[pos].style.transform = `translateX(${-pos * 500 + offset * 500}px)`
        }
        // for (let child of children) {
        //   child.style.transition = ""

        //   child.style.transform = `translateX(${-position * 500}px)`
        // }
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
      }
      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    })

    /* let currentIndex = 0
    setInterval(() => {
      let children = this.root.children;
      let nextIndex = (currentIndex + 1) % children.length
      let current = children[currentIndex];
      let next = children[nextIndex]

      next.style.transition = "none"
      next.style.transform = `translateX(${100 - nextIndex * 100}%)`

      setTimeout(() => {
        next.style.transition = ""
        current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
        next.style.transform = `translateX(${- nextIndex * 100}%)`

        currentIndex = nextIndex
      }, 16);

    }, 3000); */
    return this.root;
  }
  mountTo(parent) {
    parent.appendChild(this.render())
  }
}

// document.body.appendChild(a)
let d = [
  'https://placehold.it/1142x640/00ff00?text=img1',
  'https://placehold.it/1142x640/ffff00?text=img2',
  'https://placehold.it/1142x640/ff0000?text=img3',
  'https://placehold.it/1142x640/ff00ff?text=img4'
]

let a = <Carousel src={d} />
a.mountTo(document.body)