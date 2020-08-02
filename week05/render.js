const images = require('images')

function render(viewport, element){
    if(element.style){
        var img = images(element.style.width, element.style.height);

        if(element.style["background-color"]){
            let color = element.style["background-color"] || "rgb(255, 255, 255)";
            let val = color.match(/\d+/g);
            img.fill(Number(val[0]), Number(val[1]), Number(val[2]));
            viewport.draw(img, element.style.left || 0, element.style.top || 0);
        }
    }

    if(element.children){
        for (var child of element.children) {
            render(viewport, child);
        }
    }
}

module.exports = render;