export default class Misc {
    dist(x1,y1,x2,y2) {
        return Math.sqrt( ((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)) )
    }

    random(num1,num2) {
        return Math.random() * (num2 - num1) + num1; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    }

    randItem(list) {
        return list[Math.round(this.random(0,list.length-1))]
    }

    dirToVector(dir) {
        return [
            Math.sin(this.toRad(dir)),
            Math.cos(this.toRad(dir))
        ]
    }

    constrain(n,a,b) {
        return Math.min(b, Math.max(a, n))
    }

    normalizeVector(v) {
        let magnitude = Math.sqrt((v[0]*v[0]) + (v[0]*v[0]))
        return [
            v[0]/magnitude,
            v[1]/magnitude
        ]
    }

    toRad(deg) {
        return deg * (Math.PI/180)
    }

    toDeg(rad) {
        return rad * (180/Math.PI)
    }

    vectorBetween(x1,y1,x2,y2) {
        return [
            x2-x1,
            y2-y1
        ]
    }

    multVector(v,scalar) {
        return [
            v[0] * scalar,
            v[1] * scalar
        ]
    }

    
}