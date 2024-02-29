export default class Input {
    constructor() {

        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.initInput();
        this.mouseX = 0;
        this.mouseY = 0
    }

    update() {

    }

    draw() {

    }

    initInput() {
        document.addEventListener("keydown", e => {
            this[e.key] = true;
        });
        
        document.addEventListener("keyup", e => {
            this[e.key] = false;
        });

        document.addEventListener("mousemove", e => {
            this.mouseX = e.clientX
            this.mouseY = e.clientY
        });




    }
}