//script is all the logic of the game makes alien, player, bullets
//script controls the player, when they move, when and how fast bullets fire
//script updates them and makes them 'think'

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let scoreText = document.querySelector("h2");

//player move right/left function
window.addEventListener('keydown', keypressed =>
{
    if(keypressed.key == 'a' || keypressed.key == "ArrowLeft") player.x--; //player can pick wsad or righ/left arrow
    if(keypressed.key == 'd' || keypressed.key == "ArrowRight") player.x++;
    if(keypressed.key == ' ') bullets.push(new Bullet(player.x, player.y -1, 'red')); //make unlimited red bullets
})

let tileSize = 25;
let ticks = 0; //ticks - the speed the entities move
let score = 0;

//make alien ship - the player
let player = new Player(10, 19, 'blue'); //player at pos10 is center, and pos19 is bottom

//make bullets
//invader as a circle(arc)
//engineering math-radians 2*math.pi is a complete circle anticlockwise
let bullets = [];

//make alien invaders - made 15 of them little blue aliens
let aliens = [];

for(let y = 0; y < 3; y++) //y axis
{
    for(let x = 3; x < 15; x++) //so in this version x=3 makes aliens start at position 3 on grid
    aliens.push(new Alien(x, y, 'green')); //green aliens - little green men!!
}

//this function runs every single frame so you can redraw all entities alien, player etc.
function Update(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear whole canvas

    if(ticks % Alien.speed == 0){
        Alien.think();
    }

    player.Draw();
    aliens.forEach(alien => {
        alien.Draw();
    });

    bullets.forEach(bullet => {
        bullet.Think(); //making bullets move up
        bullet.Draw();
        });

    ticks++;
    window.requestAnimationFrame(Update);
}

//canvas magic function for calling animation frame, timed so that when it finishes drawing function it calls again - loooop de loop
window.requestAnimationFrame(Update);
