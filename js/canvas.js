const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particulesAnimation;
let arrayParticules = [];
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let numberOfParticules = 0;

class Particule {
    constructor(obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.speed = obj.speed;
        this.size = obj.size;
        this.color = obj.color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color
        ctx.fill();
    }

    move() {
        if(this.x >= window.innerWidth) this.x = 0; // replace la particule à gauche de l'écran si elle arrive au bout
        this.draw();
        this.x += this.speed;
    }
}

function init() {
    if(window.innerWidth > 1000) {
        numberOfParticules = 90;
    } else {
        numberOfParticules = 30;
    }
    console.log(CSSStyleSheet)
    arrayParticules = [];
    for (let i =0; i < numberOfParticules; i++) {
        const size = getRandomNumber(0.4, 3.3);
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const speed = getRandomNumber(0.2, 1.2);
        const color = `rgba(255,255,255, ${getRandomNumber(0.3, 1)})`;
        arrayParticules.push(new Particule({size, x, y, speed, color}))
    }

    animation();
}

function animation() {
    particulesAnimation = requestAnimationFrame(animation);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    arrayParticules.forEach(particule => particule.move());
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

init();




