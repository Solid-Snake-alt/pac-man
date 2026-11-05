const TILE_SIZE = 32;
const COLS = 40;
const ROWS = 17;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");

canvas.width = COLS * TILE_SIZE;
canvas.height = ROWS * TILE_SIZE;

const originalMap = [
    "########################################",
    "#........#.............................#",
    "#........       .......................#",
    "#.............       ..           .....#",
    "#.........#............................#",
    "#..................# ..................#",
    "#.................        #     ..#....#",
    "#...............  .....................#",
    "#.     #       # ...........  ...   ...#",
    "#....     ##    ....... # .............#",
    "#.....  ....................     ......#",
    "#.....................        ##.......#",
    "#..#  # ......................#........#", 
    "#.........##.................    ......#",
    "#..............     ..............###..#",
    "#............ ##   ....#............#..#",
    "########################################"
];

let map;
let won;
let player;

function resetGame() {
    map = originalMap.map(row => row.split(""));
    won = false;

    player = {
        x: 1.5 * TILE_SIZE,
        y: 1.5 * TILE_SIZE,
        speed: 175,
        size: 20
    };
}

window.addEventListener("keydown", event => {
        const key = event.key.toLowerCase();
        if (["w","a","s","d","r","arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
            event.preventDefault();
        }
        if (key == "r") {
            resetGame();
            return;
        }
        pressed.add(key);
    }
);

window.addEventListener("keyup", event => {
    pressed.delete(event.key.toLowerCase());
}); 

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let rows = 0; rows < ROWS; rows++) {
        for (let cols = 0; cols < COLS; cols++) {

            const tile = map[rows][cols];
            const x = cols * TILE_SIZE;
            const y = rows * TILE_SIZE;

            if (tile === "#") {
                ctx.fillStyle = "#052ea9";
                ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

                ctx.fillStyle = "#000000";
                ctx.fillRect(
                    x + 3, y + 3,
                    TILE_SIZE - 6, TILE_SIZE - 6
                );
            } 
            if (tile == ".") {
                ctx.fillStyle = "#c3c016"
                ctx.font = "bold 22px sans-serif";
                ctx.fillText(".", x+TILE_SIZE/2, y+TILE_SIZE/2);
            }
        }
    }

    const radius = 15;
    const x = 20 + TILE_SIZE;
    const y = 20 + TILE_SIZE;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(x, y);
    ctx.fillStyle = "#f3ff10";
    ctx.fill()
}

let previousTime = 0; //previous frame, used for calculating the time difference b/w two frames.

function gameLoop(timestamp) { //timestamp is a predefined parameter given by the requestAnimationFrame() function which tells you how much time has elapsed since the browser refreshed.
    const dt = Math.min((timestamp - previousTime) / 1000 || 0, 0.05); 
    previousTime = timestamp;
    
    draw();
    requestAnimationFrame(gameLoop);
}

resetGame();
requestAnimationFrame(gameLoop)