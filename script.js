import Main from "./main.js";

const canv = document.getElementById("screen");
const ctx = canv.getContext("2d");

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
canv.width = WIDTH
canv.height = HEIGHT


const SPEED = 30

function printLines(text,x,y,size) {
    text.reverse()
    ctx.font = `${size}px Comic Sans MS`
    ctx.fillStyle = "black"
    for (let i = 0;i < text.length; i++) {
        ctx.fillText(text[i],x,y-(i*(size*1.03)))
    }
}












const main = new Main(WIDTH,HEIGHT)

let lastTime = Date.now()
let dt = 0

function mainStuff() {
    dt = (Date.now() - lastTime)/1000
    lastTime = Date.now()
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,WIDTH,HEIGHT)
    
    main.update(dt,SPEED)

    main.draw(ctx)


    printLines([
        `FPS: ${(1/dt).toFixed(2)}`,
        `DeltaTime: ${dt.toFixed(3)}`,
        `Simulation speed: ${SPEED}`
    ],
    0,
    HEIGHT*0.98,
    HEIGHT*0.05
    )
}

setInterval(mainStuff,33)