
//Object.defineProperty(exports, "__esModule", { value: true });
//exports.TapEngine = void 0;
/**
 * The Tap Engine
 * @constructor
 *
 *
 *
 *
 */
class TapEngine {

    constructor(GameCanvasID) {
        /** Number to increment by */
        this.increment = 0.01;
        /**Total count of ticks */
        this.tic = 0;
        this.msPerTic = 100;
        this.BarPos = 0;
        this.lastBarPos = 0.5;
        this.IntervalID = -1;
        let c = document.getElementById(GameCanvasID);
        if (c instanceof HTMLCanvasElement) {
            this.gv = c;
        }
        else {
            throw new Error("c does not work");
        }
        let context = this.gv.getContext("2d");
        if (context instanceof CanvasRenderingContext2D) {
            this.ctx = context;
        }
        else {
            throw new Error("cant get context");
        }
        this.id = new Date().toISOString();
        this.player1 = new Player('Player 1', 'red');
        this.player2 = new Player('Player 2', 'blue');

        this.FingerBlaster = new Toucher();

        this.windowResize();
        console.debug(this.setBarPerc(0.5));

        window.addEventListener('resize', () => {
            this.windowResize();
        })
    }
    getBarPerc() {
        return (this.BarPos / this.height);
    }
    setBarPerc(p) {
        if (p >= 0 && p <= 1) {
            this.BarPos = p * this.height;
            return this.BarPos;
        }
        else {
            console.error(`${p} is out of range`);
            return -1;
        }
    }
    
    startGame() {
        //ToDO random game start stuff

        this.setBarPerc(0.5);
        this.drawAtPosition(this.BarPos);
        this.IntervalID = setInterval(() => { this.loop() }, this.msPerTic);
    }
    setFPS(targetFPS) {
        let msPerFrame = (1 / targetFPS) * 1000;
        this.msPerTic = msPerFrame;
        return msPerFrame;
    }
    loop() {
        //get location
        /**Check if someone won */
        if (this.BarPos >= this.height || this.BarPos <= 0) {
            let winner;
            //player1
            if (this.BarPos >= 0) {
                winner = this.player1.name;
            }
            //player2
            if (this.BarPos <= 0) {
                winner = this.player2.name;
            }
            alert(`game over ${winner} is the winner!`);
            this.setBarPerc(0.5);
        }
        //If anything has changed
        if (this.BarPos != this.lastBarPos) {
            this.drawAtPosition(this.BarPos);
        }
        this.lastBarPos = this.BarPos;
        this.tic++;
    }


    touchStart(ev) {
        console.log('touchstart')
        let t = Date().getTime();
        this.FingerBlaster.tstart(ev, t);
    }

    touchMove() {
        ;
    }

    touchEnd(ev) {
        console.log('touchend')
        let t = Date().getTime();
        this.FingerBlaster.tend(ev, t)
    }



    windowResize() {
        this.gv.height = window.innerHeight;
        this.gv.width = window.innerWidth;

        var p = this.getBarPerc();

        this.height = window.innerHeight;
        this.width = window.innerWidth;

        this.setBarPerc(p);

        this.drawAtPosition(this.BarPos);
    }

    drawAtPosition(position) {
        console.debug('starting to draw');
        let ctx = this.ctx;
        if (ctx === null) {
            throw new Error("error");
        }
        //clear entire canvas
        ctx.beginPath();
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.closePath();
        //draw player 1 
        ctx.beginPath();
        ctx.rect(0, 0, this.width, position);
        ctx.fillStyle = this.player1.color;
        ctx.fill();
        ctx.closePath();
        //draw player2
        ctx.beginPath();
        let p2_x = 0;
        let p2_y = position;
        let p2_w = this.width;
        let p2_h = (this.height - position);
        ctx.rect(p2_x, p2_y, p2_w, p2_h);
        ctx.fillStyle = this.player2.color;
        ctx.fill();
        ctx.closePath();
        //draw margin
        ctx.beginPath();
        ctx.rect(0, position - (this.height / 200), this.width, this.height / 100);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        //draw p1 percent
        ctx.beginPath();
        ctx.font = '48px serif';
        ctx.fillStyle = 'black';
        let fPerc = Number(this.getBarPerc() * 100).toPrecision(2);
        ctx.fillText(`${fPerc} %`, (this.width / 2) - this.width / 5, position - 10);
        ctx.closePath();
        //draw p2 percent
        ctx.beginPath();
        ctx.font = '48px serif';
        ctx.fillStyle = 'black';
        ctx.fillText(`${(100 - (fPerc))} %`, this.width / 2, position + 40);
        ctx.closePath();
        console.debug('draw done');
    }



    process_touch_debug(event, post = false) {
        let touches = event.touches;
        let output = [];
        let JSONArr = [];
        for (let i = 0; i < touches.length; i++) {
            let touch = {
                clientX: touches[i].clientX,
                clientY: touches[i].clientY,
                force: touches[i].force,
                identifier: touches[i].identifier,
                pageX: touches[i].pageX,
                pageY: touches[i].pageY,
                radiusX: touches[i].radiusX,
                radiusY: touches[i].radiusY,
                rotationAngle: touches[i].rotationAngle,
                screenX: touches[i].screenX,
                screenY: touches[i].screenY
            };
            let touchJSON = JSON.stringify(touch);
            output.push(touch)
            JSONArr.push(touchJSON)
        }

        if (post) {
            fetch('/debug', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(JSONArr),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }


}

class Player {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
}

/* class Finger {
    startTime;
    player;
    constructor(player, event) {
        this.startTime = new Date().getTime()();
        this.player = player;

    }
}
 */
class Toucher {
    /**
     * 
     * @param {number} mt - max number of touches 
     */

    constructor(mt = 8) {
        this.maxTouches = mt;
        this.TDB = [];

        this.lastTicTime = new Date().getTime();
        this.TicTime = this.lastTicTime;
        for (let i = 0; i < mt; i++) {
            let finger = {
                on: false,
                X: 0,
                Y: 0,
                startTime: this.TicTime
            };
            this.TDB.push(finger);
        }
    }

    /**
     * 
     * @param {number} f - finger id 
     * @param {number} x - X co ord
     * @param {number} y - Y co ord
     */
    static touch(f, x, y, sig = 'ON') {
        let t = {
            id: f,
            x: x,
            y: y,
            sig: sig
        }

        return t;
    }

    getStarted(gv) {

        gv.addEventListener('touchstart', (ev) => {
            //let t = Date().getTime();
            console.log('my ass')
            //this.process_touch_debug(ev, true);
        });
       /*  gv.addEventListener('touchmove', (ev) => {
            let t = Date().getTime();
            this.tm(ev,t);
            //this.process_touch_debug(ev, true);
        }); */
        gv.addEventListener('touchend', (ev) => {
            let t = Date().getTime();
            this.tend(ev,t);
            //this.process_touch_debug(ev, true);
        });
    }

    tstart(ev, t) {

        let eTouch = ev.touches;
        let increase = (this.increment * this.height)
        for (var i = 0; i < eTouch.length; i++) {
            //process_touch(event.targetTouches[i])
            var touch = Toucher.touch(eTouch[i].identifier, eTouch[i].clientX, eTouch[i].clientY);

            this.TDB[i].on = true;
            this.TDB[i].startTime = t;
            this.TDB[i].x = touch.x;
            this.TDB[i].y = touch.y;

            console.debug(`Touch Start - ${touch}`);
        }
    }

    tend(ev, t) {

        let touches = ev.changedTouches;
        let increase = (this.increment * this.height);

        for (var i = 0; i < touches.length; i++) {
            //process_touch(event.targetTouches[i])
            var touch = Toucher.touch(touches[i].identifier, touches[i].clientX, touches[i].clientY);

            for (let i = 0; i < this.TDB.length; i++) {
                if (this.TDB[i].id == touch.id) {
                    let diff = t - this.TDB[i].startTime;
                    console.debug(`time diff MS - ${diff}`);
                }

            }
        }


        //start animating
    }
}






//Very Start

function startGame() {
    gEngine = new TapEngine('thegame');
    gEngine.gv.width = document.body.clientWidth; //document.width is obsolete
    gEngine.gv.height = document.body.clientHeight; //document.height is obsolete
    gEngine.increment = 0.01;
    
    gEngine.startGame();

    gEngine.FingerBlaster.getStarted(gEngine.gv);
}