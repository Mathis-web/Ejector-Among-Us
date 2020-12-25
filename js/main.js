const container = document.querySelector('.container');
const messageContainer = document.querySelector('.message-container');
const numberImage = Math.floor(getRandomNumber(1, 10));
const positionX = [0, window.innerWidth];
const positionY = [0, window.innerHeight];
let idAnimation;
let isMessageDisplayed = false;
let ejectionMessageValue, endMessageValue;
let createCharacterTimeout;

const form = document.getElementById('ejector-form');
form.addEventListener('submit', ejectorPage);

class AmongUsCharacter {
    alt = "personnage among us";
    static numberCharacter = 0;

    constructor(obj) {
        this.id = obj.id;
        this.x = obj.x;
        this.y = obj.y;
        this.speed = obj.speed;
        this.directionX = obj.directionX;
        this.directionY = obj.directionY;
        this.numberImage = obj.numberImage;
        this.width = obj.width;
        this.src = `ressources/character-among-us-${this.numberImage < 10 ? `0${this.numberImage}`: this.numberImage}.png`;
    }

    createImage() {
        const img = new Image();
        img.className = "among-us";
        img.src = this.src;
        img.alt = this.alt;
        img.style.left = `${this.x}px`;
        img.style.top = `${this.y}px`;
        img.style.width = `${this.width}px`;
        img.id = AmongUsCharacter.numberCharacter;
        AmongUsCharacter.numberCharacter++;
        return img;
    }

    move() {

        if(this.id === 'ejected-character') { // on vérifie si le personnage correspond à celui du formulaire
            const character = document.getElementById(AmongUsCharacter.numberCharacter - 1);
            if (!character) {
                cancelAnimationFrame(idAnimation);
                return;
            }
            if (this.x > window.innerWidth) {
                character.remove();
                // setTimeout(() => document.querySelector('.play-again').style.display = "block", 2100)
                return;
            }
            if(this.x > messageContainer.offsetLeft && !isMessageDisplayed) {
                isMessageDisplayed = true;
                displayMessage(ejectionMessageValue, endMessageValue)
            }
            this.x += this.directionX * this.speed; 
            this.y += this.directionY * this.speed;
            character.style.left = `${this.x}px`;
            character.style.top = `${this.y}px`;
        }

        const character = document.getElementById(`${this.id}`);
        if(!character) return;
        if(this.x < -50 || this.y < -50 || this.x > window.innerWidth || this.y > window.innerHeight) {
            character.remove()
        }

        if(this.x === 0) {
            // this.y = Math.random() * window.innerHeight
            if(this.directionX < 0) this.directionX = -this.directionX;
        };
        if(this.y === 0) {
            // this.x = Math.random() * window.innerWidth;
            if(this.directionY < 0) this.directionY = -this.directionY;
        }
        if(this.x === window.innerWidth) {
            // this.y = Math.random() * window.innerHeight;
            if(this.directionX > 0) this.directionX = -this.directionY;
        }
        if(this.y === window.innerHeight){
            // this.x = Math.random() * window.innerWidth;
            if(this.directionY > 0) this.directionY = -this.directionY;
        }

        this.x += this.directionX * this.speed; 
        this.y += this.directionY * this.speed;
        character.style.left = `${this.x}px`
        character.style.top = `${this.y}px`
    }
}

function createCharacter() {
    let width;
    window.innerWidth > 650 ? width = 60 : width = 45;
    const character = new AmongUsCharacter({
        id: AmongUsCharacter.numberCharacter,
        x: positionX[Math.floor(getRandomNumber(0, 2))],
        y: positionY[Math.floor(getRandomNumber(0, 2))],
        directionX: Math.random() * 0.2 - 0.1,
        directionY: Math.random() * 0.2 - 0.1,
        speed: 15,
        width: width,
        numberImage: Math.floor(getRandomNumber(1, 10))
    })
    
    const characterImg = character.createImage();
    container.appendChild(characterImg);
    animationCharacter(character);

    const randomNumber = getRandomNumber(2, 7);
    createCharacterTimeout = setTimeout(createCharacter, randomNumber * 1000)
}

function animationCharacter(character) {
    idAnimation = requestAnimationFrame(() => {
        animationCharacter(character)
    });
    character.move()
}

createCharacter();

// Ejector page

let count = 0;

const endMessage = document.querySelector('.end-message');
const ejectionMessage = document.querySelector('.ejection-message');

function ejectorPage(e) {
    e.preventDefault();
    clearTimeout(createCharacterTimeout);
    cancelAnimationFrame(idAnimation)
    document.querySelectorAll('.among-us').forEach(perso => perso.remove());
    document.querySelector('.form-container').style.display = "none";

    ejectionMessageValue = form.name.value + ' ' + form.ejectionMessage.value;
    endMessageValue = form.endMessage.value;

    ejectedCharacter();
}

function displayMessage(firstMessage, secondMessage) {
    if (count < firstMessage.length) {
        ejectionMessage.textContent += firstMessage.charAt(count);
        count++;
        setTimeout(() => {
            displayMessage(firstMessage, secondMessage);
        }, 75)
    } else {
        setTimeout(() => {
            endMessage.textContent = secondMessage;
            endMessage.classList.add('scale-animation');
            setTimeout(() => document.querySelector('.play-again').style.display = "block", 1500)
        }, 800)
    }
}

function ejectedCharacter() {
    let speed, width;
    if(window.innerWidth < 600) {
        speed = 2;
        width = 45;
    } else {
        speed = 4;
        width = 60;
    }
    const ejectedCharacter = new AmongUsCharacter({
        id: 'ejected-character',
        x: -40,
        y: window.innerHeight / 2 - 40,
        directionX: 1,
        directionY: 0,
        speed: speed,
        width: width,
        numberImage: Math.floor(getRandomNumber(1, 10))
    })

    
    setTimeout(() => {
        const characterImg = ejectedCharacter.createImage();
        container.appendChild(characterImg);    
        animationCharacter(ejectedCharacter);
    }, 1000)
}

function reset() {
    document.querySelector('.play-again').style.display = "none";
    document.querySelector('.end-message').textContent = "";
    document.querySelector('.end-message').classList.remove('scale-animation');
    document.querySelector('.ejection-message').textContent = "";
    isMessageDisplayed = false;
    count = 0;
}

const playAgain = document.querySelector('.animate-again');
const homepage = document.querySelector('.homepage');

homepage.addEventListener('click', () => {
    reset();
    document.querySelector('.form-container').style.display = 'block';
    createCharacter();
})

playAgain.addEventListener('click', () => {
    reset();
    ejectedCharacter();
})

function resize() {
    cancelAnimationFrame(particulesAnimation);
    init();
}

let resizeTimeout;
window.addEventListener('resize', () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 400); 
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})