import Input from "./input.js"
import Particle from "./particle.js"
import Misc from "./misc.js"

export default class Main {
    constructor(WIDTH,HEIGHT) {
        this.width = WIDTH
        this.height = HEIGHT
        this.G = 6.67 * (10 ** (-11))
        console.log(this.G)
        this.colors = [
            "green",
            "red",
            "orange",
            "blue",
        ]

        this.interactions = {
            "attract": {

            },

            "repel": {

            }
        }


        this.input = new Input()
        this.misc = new Misc()


        // this.colors.forEach(c => {
        //     console.log(this.colors)
        //     let heldList = this.colors.map((x) => x)
        //     heldList.splice(heldList.indexOf(c),1) // remove that color
        //     this.interactions.attract[c] = []

        //     let heldItem = this.misc.randItem(heldList)
        //     this.interactions.attract[c].push(heldItem)
        //     heldList.splice(heldList.indexOf(heldItem),1) // first item

        //     heldItem = this.misc.randItem(heldList)
        //     this.interactions.attract[c].push(heldItem)
        //     heldList.splice(heldList.indexOf(heldItem),1) // second one

        //     this.interactions.repel[c] = [heldList[0], c] // assuming there are 4 elements
        // })

        this.colors.forEach(c => {
            this.interactions.attract[c] = []
            this.interactions.repel[c] = [c]
        })

        this.colors.forEach(c => {
            let heldList = this.colors.map((x) => x)
            heldList.splice(heldList.indexOf(c),1) // remove that color
            heldList.forEach(e => {
                if (this.interactions.repel[c].includes(e)) {
                    heldList.splice(heldList.indexOf(e),1)
                }
                // remove any colors that it's repelled to
           })
           let loops = 0
           for (let i = 0; (i < heldList.length) && (i < 3); i++) {
            if (loops < 2) {
                let heldItem = this.misc.randItem(heldList)
                this.interactions.attract[c].push(heldItem)
                heldList.splice(heldList.indexOf(heldItem),1)
                // add repel
                console.log(c,loops,heldList)
                i -= 1
                loops += 1
            }
            else {
                let heldItem = this.misc.randItem(heldList)
                this.interactions.repel[c].push(heldItem)
                heldList.splice(heldList.indexOf(heldItem),1)
                this.interactions.repel[heldItem].push(c)
                i -= 1
            }

           }

        })
        //console.log(this.colors)
        console.log(this.interactions)

        
        

        this.particles = []

        for (let i = 0; i < 100; i++) {
            this.particles.push(new Particle(this))
        }
    }

    update(dt,speed) {
        this.particles.forEach(p => {
            p.update(dt,speed)
        })
    }

    draw(ctx) {
        this.particles.forEach(p => {
            p.draw(ctx)
        })
    }
}