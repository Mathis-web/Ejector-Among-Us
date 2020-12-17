const container = document.querySelector('.container');
const numberImage = Math.floor(getRandomNumber(1, 10));

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
        this.src = `../ressources/character-among-us-${this.numberImage < 10 ? `0${this.numberImage}`: this.numberImage}.png`;
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
        const character = document.getElementById(`${this.id}`);
        if(!character) return;
        if(this.x < 0 || this.y < 0 || this.x > window.innerWidth || this.y > window.innerHeight) {
            character.remove()
        }
        this.x += this.directionX * this.speed; 
        this.y += this.directionY * this.speed;
        character.style.left = `${this.x}px`
        character.style.top = `${this.y}px`
    }
}

setInterval(createCharacter, 1000)


function createCharacter() {
    const character = new AmongUsCharacter({
        id: AmongUsCharacter.numberCharacter,
        x: 0,
        y: 0,
        directionX: Math.random() * 0.2 - 0.1,
        directionY: Math.random() * 0.2 - 0.1,
        speed: 35,
        numberImage: Math.floor(getRandomNumber(1, 10))
    })

    console.log(character)

    const characterImg = character.createImage();
    container.appendChild(characterImg);
    animationCharacter(character)
}

function animationCharacter(character) {
    requestAnimationFrame(() => {
        animationCharacter(character)
    });
    character.move()
}


