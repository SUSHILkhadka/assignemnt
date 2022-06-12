canvasWidth = 1200
canvasHeight = 600

// canvasWidth = 5000
// canvasHeight = 2000

canvas = document.getElementById("canvas1");
ctx=canvas.getContext('2d')
canvas.height = canvasHeight;
canvas.width = canvasWidth;
canvas.style.position = 'absolute';
// canvas.style.top = "100px";
// canvas.style.left = "100px";
canvas.style.border = '1px solid #000';




DEFAULT_height = 30;
DEFAULT_width = 30;
DEFAULT_x = 20;
DEFAULT_y = 0;
DEFAULT_dx = 1;
DEFAULT_dy = 1;
DEFAULT_color = "#111";


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

    create1(){
        ctx.fillStyle=this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.w/2,0,Math.PI*2)
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }





    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
    checkWallCollision() {

        if (this.x >= canvasWidth - this.w/2) {
            this.dx = -Math.abs(this.dx);
            this.x = canvasWidth - this.w/2;
        }

        if (this.x <= 0) {
            this.dx = Math.abs(this.dx)
            this.x = 0;
        };

        if (this.y >= canvasHeight - this.h/2) {
            this.dy = -Math.abs(this.dy);
            this.y = canvasHeight - this.h/2;
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


                let x1 = this.x;
                let y1 = this.y ;


                let x2 = anotherball.x 
                let y2 = anotherball.y;

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


                    let normalX2 = -normalX
                    let normalY2 = -normalY
                    let diffX2 = -diffX
                    let diffY2 = -diffY
                    let dotx2 = diffX2 * normalX2
                    let doty2 = diffY2 * normalY2

                    let constant2 = d * (dotx2 + doty2) / unitDivider
                    anotherball.dx = anotherball.dx - constant2 * normalX2
                    anotherball.dy = anotherball.dy - constant2 * normalY2




                    // overlapp removal
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
for (let i = 0; i < 500; i++) {

    console.log(generateRandom(0, colors.length))

    let speedfactor = 3;
    let rdx = generateRandom(-1, 1) * speedfactor;
    let rdy = generateRandom(-1, 1) * speedfactor;
    let rsize = generateRandom(5, 30);


    const b = new ball(generateRandom(0, canvasWidth - rsize),
    generateRandom(0, canvasHeight - rsize), rdx, rdy, rsize, colors[Math.floor(generateRandom(0, colors.length))]);
    b.create1();

    ballarray.push(b);

}




function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);


    for (let index = 0; index < ballarray.length; index++) {
        ballarray[index].create1();
        ballarray[index].move();
        ballarray[index].checkWallCollision();
        ballarray[index].checkBallsCollision(ballarray, index);
    }


    requestAnimationFrame(animate);
}

animate();


