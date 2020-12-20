const container = document.querySelector('.container');
const messageContainer = document.querySelector('.message-container');
const numberImage = Math.floor(getRandomNumber(1, 10));
const positionX = [0, window.innerWidth];
const positionY = [0, window.innerHeight];
let idAnimation;
let isMessageDisplayed = false;
let ejectionMessageValue, endMessageValue;

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
        this.src = `ressources/character-among-us-${this.numberImage < 10 ? `0${this.numberImage}`: this.numberImage}.png`;
    }

    createImage() {
        const img = new Image();
        img.className = "among-us";
        img.src = this.src;
        img.alt = this.alt;
        img.style.left = `${this.x}px`;
        img.style.top = `${this.y}px`;
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
                document.querySelector('.play-again').style.display = "block";
                return;
            }
            if(this.x > messageContainer.offsetLeft && !isMessageDisplayed) {
                isMessageDisplayed = true;
                displayMessage(ejectionMessageValue, endMessageValue)
                console.log(ejectionMessageValue, endMessageValue)
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
    const character = new AmongUsCharacter({
        id: AmongUsCharacter.numberCharacter,
        x: positionX[Math.floor(getRandomNumber(0, 2))],
        y: positionY[Math.floor(getRandomNumber(0, 2))],
        directionX: Math.random() * 0.2 - 0.1,
        directionY: Math.random() * 0.2 - 0.1,
        speed: 35,
        numberImage: Math.floor(getRandomNumber(1, 10))
    })
    
    const characterImg = character.createImage();
    container.appendChild(characterImg);
    animationCharacter(character)
}

function animationCharacter(character) {
    idAnimation = requestAnimationFrame(() => {
        animationCharacter(character)
    });
    character.move()
}

createCharacter();
let ejectCharacter = setInterval(createCharacter, 2500);

// Ejector page

let count = 0;

const endMessage = document.querySelector('.end-message');
const ejectionMessage = document.querySelector('.ejection-message');

function ejectorPage(e) {
    e.preventDefault();
    clearInterval(ejectCharacter);
    cancelAnimationFrame(idAnimation)
    document.querySelectorAll('.among-us').forEach(perso => perso.remove());
    document.querySelector('.form-container').style.display = "none";

    ejectionMessageValue = form.name.value + ' ' + form.ejectionMessage.value;
    endMessageValue = form.endMessage.value;

    ejectedCharacter();
}

function displayMessage(firstMessage, secondMessage) {
    console.log('bonjour')
    if (count < firstMessage.length) {
        ejectionMessage.textContent += firstMessage.charAt(count);
        count++;
        setTimeout(() => {
            displayMessage(firstMessage, secondMessage);
        }, 75)
    } else {
        setTimeout(() => {
            endMessage.textContent = secondMessage;
            endMessage.classList.add('scale-animation')
        }, 500)
    }
}

function ejectedCharacter() {
    const ejectedCharacter = new AmongUsCharacter({
        id: 'ejected-character',
        x: -40,
        y: window.innerHeight / 2 - 60,
        directionX: 1,
        directionY: 0,
        speed: 4,
        numberImage: Math.floor(getRandomNumber(1, 10))
    })

    
    setTimeout(() => {
        const characterImg = ejectedCharacter.createImage();
        container.appendChild(characterImg);    
        animationCharacter(ejectedCharacter);
    }, 1000)
}

const playAgain = document.querySelector('.animate-again');
const homepage = document.querySelector('.homepage');

homepage.addEventListener('click', () => {
    document.querySelector('.end-message').textContent = "";
    document.querySelector('.ejection-message').textContent = "";
    document.querySelector('.end-message').classList.remove('scale-animation');
    document.querySelector('.form-container').style.display = 'block';
    document.querySelector('.play-again').style.display = "none";
    isMessageDisplayed = false;
    count = 0;
    ejectCharacter = setInterval(createCharacter, 2500);
})

playAgain.addEventListener('click', () => {
    document.querySelector('.play-again').style.display = "none";
    document.querySelector('.end-message').textContent = "";
    document.querySelector('.ejection-message').textContent = "";
    document.querySelector('.end-message').classList.remove('scale-animation');
    isMessageDisplayed = false;
    count = 0;
    ejectedCharacter();
})

