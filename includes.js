//includes defines all the details of how, why, what
//includes handles all the functions that drive the logic of game behind scenes
//contains definitions of all objects and helper functions
//you could take includes code and make it into any similar styled game

function fillRectGrid(x, y)
{
    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
}

function fillCircleGrid(x, y) {
    ctx.beginPath();
    ctx.arc((x * tileSize) + (x + tileSize / 2), //circles are measured from center point to edge. This formula adjusts circle to 0,0 start point
        (y * tileSize) + (y + tileSize / 2), //same for y axis
        tileSize/2, 0, 2 * Math.PI); //then crazy pi math to draw complete circle
    ctx.fill();
}

//parent class of all objects
class Entity{
    constructor(x, y, color)
    {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    Draw(){
        ctx.fillStyle = this.color;
        fillRectGrid(this.x, this.y);
    }
}

//ship as a square
class Player extends Entity{}

class Bullet extends Entity{
    Think()
    {
        this.y--; //makes bullet go up

        for(let i = 0; i < aliens.length; i++) //checking if bullets hit aliens
        {
            if(this.x == aliens[i].x && this.y == aliens[i].y)
            {
                aliens.splice(i, 1)//splice method removes shot alien i=alien that got hit, and 1 is removing that 1 hit alien
                bullets.splice(bullets.indexOf(this), 1)
                score +=1;
                scoreText.innerHTML = `Score: ${score}`;
            }
        }
    }
}

//alien invader
class Alien extends Entity{ //now override the parent entity, defined as a rectangle with a circle entity for alien
    Draw(){
        ctx.fillStyle = this.color;
        fillCircleGrid(this.x, this.y);
    }

    static direction = 1; //which way, left or right are aliens going
    static speed = 40; //start speed at 40 for kicks - it ramps up at each wall hit see alien.speed!
    static hasHitWall = false; //works with move alien rows down if they hit either wall
    static think() //method to make aliens move together in unison 'think' is a doom reference...haha
    {
        //breaking out of loop for collision detection
        for(let i = 0; i < aliens.length; i++)
        {
            if((aliens[i].x + 1 == (canvas.width/tileSize -1) && Alien.direction == 1) || (aliens[i].x -1 == -1  && Alien.direction == -1)) //check if next tile is edge of board right or left
            {
                Alien.direction = -(Alien.direction); //switch direction when they hit right side of board - if it's minus or plus either side
                Alien.hasHitWall = true;
                Alien.speed -= 7; //funky speed up of aliens each time they hit either wall speed increases
                if(Alien.speed <= 0) Alien.speed = 1; // clamps speed value so if it hit a negative wrap around stop decreasing - stay at max speed.
                break;
            }
            if(aliens[i].y == 19) //check if aliens have reached bottom of board which is 19, if so 'you loose'
            {
                scoreText.innerHTML = `Score: ${score} Aliens Invaded Player Base!! YOU LOOSE`;
            }
        }

        aliens.forEach(alien => {
            if(!Alien.hasHitWall) alien.x += Alien.direction; //call this function back in script with ticks
            if(Alien.hasHitWall) alien.y++;
        })
        Alien.hasHitWall = false; //reset alien hitting wall otherwise they just go diagonally down without moving to opposite wall
    }
}
