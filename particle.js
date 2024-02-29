import Misc from "./misc.js"

export default class Particle {
    constructor(main) {
        this.main = main
        this.misc = new Misc()

        this.mass = this.misc.random(35,85) * 7500
        this.r = this.mass/75000
        this.x = this.misc.random(0,main.width-this.r)
        this.y = this.misc.random(0,main.height-this.r)
        this.color = this.misc.randItem(main.colors)


        this.dir = this.misc.random(0,360)
        this.v = this.misc.dirToVector(this.dir)

    
    }

    update(dt,speed) {

        let heldForce = 0
        this.main.particles.forEach(p => {
            if (p != this && this.misc.dist(this.x,this.y,p.x,p.y) > p.r + this.r){
                let heldv = this.misc.vectorBetween(this.x,this.y,p.x,p.y)
                heldv = this.misc.normalizeVector(heldv)
                let force = ((this.main.G * this.mass * p.mass) / (((p.x - this.x) ** 2) + ((p.y - this.y) ** 2) + 1)) * dt // if it's the distance squared you don't need to sqrt it
                force *= speed
                force *= (((+ this.main.interactions.attract[this.color].includes(p.color)) * 2) - 1) // -1 or 1
                heldv = this.misc.multVector(heldv,force)

                // if (force > heldForce) {
                //     this.v = heldv
                //     heldForce = force
                // }
                this.v = [
                    this.v[0] + heldv[0],
                    this.v[1] + heldv[1]
                ]
                
            }   

        })
        

        this.x += this.v[0]
        this.y += this.v[1]

        for (let i = 0; i < this.main.particles.length; i++) {
            let p = this.main.particles[i]
            if (p == this) { continue }
            if (this.misc.dist(this.x,this.y,p.x,p.y) < (this.r + p.r)) {
                this.x -= this.v[0]
                this.y -= this.v[1]
                this.v = [
                    0,
                    0
                ]
                break;
            }
        }

        this.x = this.misc.constrain(this.x,0,this.main.width)
        this.y = this.misc.constrain(this.y,0,this.main.height)
        this.v = [
            this.v[0]*(0.8*dt*speed),
            this.v[1]*(0.8*dt*speed)
        ]
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()

        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
        ctx.fill()
    }
}