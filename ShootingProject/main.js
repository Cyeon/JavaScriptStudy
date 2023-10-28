let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas); // 캔버스 추가

const clampNumber = (num, a, b) =>
    Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

let backgroundImg, spaceshipImg, bulletImg, enemyImg, gameoverImg;
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;
let spaceSpeed = 2;

let gameover = false;
let score = 0;

let bulletList = [];

class Bullet {
    constructor() {
        this.x = spaceshipX;
        this.y = spaceshipY;
        this.alive = true;
        bulletList.push(this);
    }

    checkHit() {
        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y &&
                this.x >= enemyList[i].x - 24 &&
                this.x <= enemyList[i].x + 48) {
                score++;
                this.alive = false;
                enemyList.splice(i, 1);
            }
        }
    }

    update() {
        this.y -= 7;
    }
}
function getRandomValue(min, max) {
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand;
}

let enemyList = [];
class Enemy {
    constructor() {
        this.x = getRandomValue(0, canvas.width - enemyImg.width);
        this.y = 0;
        enemyList.push(this);
    }
    update() {
        this.y += 2;

        if (this.y >= canvas.height - enemyImg.height) {
            gameover = true;
            console.log("over");
        }
    }
}

function loadImage() {
    backgroundImg = new Image();
    backgroundImg.src = "Images/background.png";

    spaceshipImg = new Image();
    spaceshipImg.src = "Images/player.png";

    bulletImg = new Image();
    bulletImg.src = "Images/bullet.png";

    enemyImg = new Image();
    enemyImg.src = "Images/Enemy.png";

    gameoverImg = new Image();
    gameoverImg.src = "Images/gameover.png";
}

let keysDown = {}
function setupKeyboardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.key] = true;
        console.log("눌린 값", keysDown);
    });

    document.addEventListener("keyup", function (event) {
        delete keysDown[event.key];

        if (event.key == " ") {
            createBullet();
        }
    });
}

function createBullet() {
    let bullet = new Bullet();
}

function createEnemy() {
    const interval = setInterval(function () {
        let enemy = new Enemy();
    }, 1000);
}

function update() {
    if ("a" in keysDown || "ArrowLeft" in keysDown) {
        spaceshipX -= spaceSpeed;
    }
    if ("d" in keysDown || "ArrowRight" in keysDown) {
        spaceshipX += spaceSpeed;
    }
    if ("w" in keysDown || "ArrowUp" in keysDown) {
        spaceshipY -= spaceSpeed;
    }
    if ("s" in keysDown || "ArrowDown" in keysDown) {
        spaceshipY += spaceSpeed;
    }

    spaceshipX = clampNumber(spaceshipX, 0, canvas.width - spaceshipImg.width);
    spaceshipY = clampNumber(spaceshipY, 0, canvas.height - spaceshipImg.height);

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }
    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
    }

}

function render() {
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImg, spaceshipX, spaceshipY);
    ctx.fillText(`SCORE : ${score}`, 20, 40);
    ctx.fillStyle = "White";
    ctx.font="20px Arial";
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive)
            ctx.drawImage(bulletImg, bulletList[i].x + 10, bulletList[i].y);
    }
    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImg, enemyList[i].x, enemyList[i].y);
    }
}

function main() {
    if (!gameover) {
        update();
        render();
        requestAnimationFrame(main);
    }
    else
        ctx.drawImage(gameoverImg, 10, 100, 380, 380);
}

loadImage();
setupKeyboardListener();
createEnemy();
main();