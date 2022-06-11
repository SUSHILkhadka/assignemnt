boundWidth = 1200
boundHeight = 600

// boundWidth = 5000
// boundHeight = 2000

bound = document.getElementsByClassName("container")[0];
bound.style.height = toPx(boundHeight);
bound.style.width = toPx(boundWidth);
bound.style.border = "thick solid #0000FF";
bound.style.position = "relative";


DEFAULT_height = 30;
DEFAULT_width = 30;
DEFAULT_x = 20;
DEFAULT_y = 0;
DEFAULT_dx = 1;
DEFAULT_dy = 1;
DEFAULT_color = "#111";
// DENSITY=100
// MAX_VELOCITY=15



var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", '#345345', '#AB7766'];

function toPx(value) {
    return `${value}px`
}


function generateRandom(min, max) {

    return Math.random() * (max - min) + min;
}


class ball {
    constructor(
        x = DEFAULT_x,
        y = DEFAULT_y,


        dx = DEFAULT_dx,
        dy = DEFAULT_dy,
        w = DEFAULT_width,
        // h = DEFAULT_height,
        color = DEFAULT_color,
    ) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.w = w;
        this.h = w;
        this.color = color;
        this.m = this.w * this.w;

    }
    create() {
        this.element = document.createElement('div');
        this.element.style.width = toPx(this.w);
        this.element.style.height = toPx(this.h);

        this.element.style.borderRadius = '50%';
        this.element.style.background = this.color;
        this.element.style.position = "absolute";

        bound.appendChild(this.element)
    }
    move() {
        // this.x +=this.sx*  this.dx;
        // this.y +=this.sy* this.dy;
        this.x += this.dx;
        this.y += this.dy;

        this.element.style.top = toPx(this.y)
        this.element.style.left = toPx(this.x)
    }
    checkWallCollision() {

        if (this.x >= boundWidth - this.w) {
            this.dx = -Math.abs(this.dx);
            this.x = boundWidth - this.w;
        }

        if (this.x <= 0) {
            this.dx = Math.abs(this.dx)
            this.x = 0;
        };

        if (this.y >= boundHeight - this.h) {
            this.dy = -Math.abs(this.dy);
            this.y = boundHeight - this.h;
        }

        if (this.y <= 0) {
            this.dy = Math.abs(this.dy);
            this.y = 0;
        }

    }
    checkBallsCollision(array, index) {

        for (let i = index + 1; i < array.length; i++) {

            let anotherball = array[i];
            if (i != index) {


                let x1 = this.x + this.w / 2;
                let y1 = this.y + this.h / 2;


                let x2 = anotherball.x + anotherball.w / 2;
                let y2 = anotherball.y + anotherball.h / 2;

                let distance = Math.sqrt((x2 - x1) * (x2 - x1) + Math.pow(y2 - y1, 2))
                let sumofradius = this.w / 2 + anotherball.w / 2;



                if (distance < sumofradius) {


                    // let a=(this.m-anotherball.m)/(this.m+anotherball.m);
                    let b = 2 * anotherball.m / (this.m + anotherball.m);
                    // let c=-a;
                    let d = 2 * this.m / (this.m + anotherball.m);

                    let normalX = x1 - x2;
                    let normalY = y1 - y2;
                    let unitDivider = (normalX * normalX + normalY * normalY)
                    let diffX = this.dx - anotherball.dx
                    let diffY = this.dy - anotherball.dy
                    let dotx = diffX * normalX
                    let doty = diffY * normalY

                    let constant1 = b * (dotx + doty) / unitDivider
                    this.dx = (this.dx - constant1 * normalX)
                    this.dy = (this.dy - constant1 * normalY)
                    // if(this.dx>MAX_VELOCITY){
                    //     this.dx=MAX_VELOCITY
                    // }
                    // else if(this.dx<-MAX_VELOCITY){
                    //     this.dx=-MAX_VELOCITY
                    // }
                    // if(this.dy>MAX_VELOCITY){
                    //     this.dy=MAX_VELOCITY
                    // }
                    // else if(this.dy<-MAX_VELOCITY){
                    //     this.dy=-MAX_VELOCITY
                    // }


                    let normalX2 = -normalX
                    let normalY2 = -normalY
                    let diffX2 = -diffX
                    let diffY2 = -diffY
                    let dotx2 = diffX2 * normalX2
                    let doty2 = diffY2 * normalY2

                    let constant2 = d * (dotx2 + doty2) / unitDivider
                    anotherball.dx = anotherball.dx - constant2 * normalX2
                    anotherball.dy = anotherball.dy - constant2 * normalY2

                    // if(anotherball.dx>MAX_VELOCITY){
                    //     anotherball.dx=MAX_VELOCITY
                    // }
                    // else if(anotherball.dx<-MAX_VELOCITY){
                    //     anotherball.dx=-MAX_VELOCITY
                    // }
                    // if(anotherball.dy>MAX_VELOCITY){
                    //     anotherball.dy=MAX_VELOCITY
                    // }
                    // else if(anotherball.dy<-MAX_VELOCITY){
                    //     anotherball.dy=-MAX_VELOCITY
                    // }


                    // this.dx = -this.dx
                    // this.dy = -this.dy
                    // anotherball.dx=-anotherball.dx
                    // anotherball.dy=-anotherball.dy



                    //overlapp removal
                    let par = -1
                    if (this.m < anotherball.m) {
                        this.x = anotherball.x - par * sumofradius * normalX / Math.sqrt(unitDivider);
                        this.y = anotherball.y - par * sumofradius * normalY / Math.sqrt(unitDivider);
                    }
                    else {
                        anotherball.x = this.x - par * sumofradius * normalX2 / Math.sqrt(unitDivider);
                        anotherball.y = this.y - par * sumofradius * normalY2 / Math.sqrt(unitDivider);

                    }
                }
            }



        }
    }
}



var ballarray = [];
for (let i = 0; i < 1000; i++) {

    console.log(generateRandom(0, colors.length))

    let speedfactor = 4;
    let rdx = generateRandom(-1, 1) * speedfactor;
    let rdy = generateRandom(-1, 1) * speedfactor;
    let rsize = generateRandom(5, 30);


    const b = new ball(generateRandom(0 + rsize, boundWidth - rsize),
        generateRandom(0 + rsize, boundHeight - rsize), rdx, rdy, rsize, colors[Math.floor(generateRandom(0, colors.length))]);
    b.create();

    ballarray.push(b);

}



function play() {

    for (let index = 0; index < ballarray.length; index++) {
        ballarray[index].move();
        ballarray[index].checkWallCollision();
        ballarray[index].checkBallsCollision(ballarray, index);
    }

    window.requestAnimationFrame(() => {
        play();
    })
}

// function play2() {


//     for (let index = 0; index < ballarray.length; index++) {
//         ballarray[index].checkBallsCollision(ballarray, index);
//     }

//     window.requestAnimationFrame(() => {
//         play2();
//     })
// }

play();
// play2();
