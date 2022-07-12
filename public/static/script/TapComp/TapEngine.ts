//@ts-check

/** 
 * The Tap Engine
 * @constructor
 * 
 *  
 * 
 * 
 */
export class TapEngine {
	
	/**Tis is the HTML canvas */
	gv: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D | null;
	id: string;

	/** Number to increment by */
	increment: number = 0.01; 
	
	/**Total count of ticks */
	tic: number = 0; 

	msPerTic = 100; 

	BarPos = 0;

	getBarPerc(): number {
			return ( this.BarPos / this.height )
	}

	setBarPerc(p: number) {
		if (p >= 0 && p <= 1) {
			this.BarPos = p * this.height;
			return this.BarPos;
		} else {
			console.error(`${p} is out of range`);
			return -1;
		}
	}


	
	lastBarPos = 0.5;

	height: number;
	width: number;

	player1: Player;
	player2: Player;
	IntervalID = -1;

	constructor(GameCanvasID: string) {
		let c = document.getElementById(GameCanvasID);

		if (c instanceof HTMLCanvasElement) {
			this.gv = c;
		} else {
			throw new Error("c does not work");
		}

		let context = this.gv.getContext("2d");
		if (typeof(context) != typeof(CanvasRenderingContext2D)) {
			throw new Error("cant get context");

		} else { this.ctx = context }
		this.width = c.width;
		this.height = c.height;

		this.id = new Date().toISOString();
		this.player1 = new Player('Player 1', 'red');
		this.player2 = new Player('Player 2', 'blue');

		console.debug(this.setBarPerc(0.5));

		this.gv.addEventListener('touchstart', (ev) => {
			this.touchStart(ev);
		});


	}

	startGame() {
		//ToDO random game start stuff

		this.drawAtPosition(this.getBarPerc());

		this.IntervalID = setInterval(this.loop, this.msPerTic);

	}

	setFPS(targetFPS: number) {
		let msPerFrame = (1 / targetFPS) * 1000;
		this.msPerTic = msPerFrame;
		return msPerFrame;
	}
	
	loop() {
		//get location
		let bar = this.BarPos;

		/**Check if someone won */
		if (bar >= this.height || bar <= 0) {
			let winner;
			//player1
			if (bar >= 0 ) {winner = this.player1.name}
			//player2
			if (bar <= 0 ) {winner = this.player2.name}

			alert(`game over ${winner} is the winner!`);
			this.setBarPerc(0.5);
		}

		//If anything has changed
		if (bar != this.lastBarPos) {
			this.drawAtPosition(bar);
		}

		this.lastBarPos = bar;
		
		this.tic++;
	}

	touchStart (ev: TouchEvent) {
		let touches = ev.touches;
		let bp = this.BarPos;
		for (var i = 0; i < touches.length; i++) {
			//process_touch(event.targetTouches[i])
			let touch = {
				X: touches[i].clientX,
				Y: touches[i].clientY,
				force: touches[i].force,
				identifier: touches[i].identifier
			}
			if (touch.Y < this.BarPos) {
				//this.player1.tap()
				bp += this.increment * this.height;
				console.debug('increment increased')

			} else if (touch.Y > this.BarPos) {
				//this.player2.tap()
				bp -= this.increment * this.height;
				console.debug('increment decreased')
			}

		};
		this.BarPos = bp;
	}

	drawAtPosition(position: number) {
		console.debug('starting to draw')
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
		ctx.rect(0, 0, this.width, position)
		ctx.fillStyle = this.player1.color;
		ctx.fill();
		ctx.closePath();

		//draw player2

		ctx.beginPath();

		let p2_x = 0;
		let p2_y = position;
		let p2_w = this.width;
		let p2_h = (this.height - position);
		
		ctx.rect(p2_x,p2_y,p2_w,p2_h)
		ctx.fillStyle = this.player2.color;
		ctx.fill();
		ctx.closePath();

		//draw margin

		ctx.beginPath();

		ctx.rect(0, position-(this.height/200), this.width, this.height / 100);
		ctx.fillStyle = "black";

		ctx.fill();

		ctx.closePath();

		//draw p1 percent

		ctx.beginPath();
		ctx.font = '48px serif';
		ctx.fillStyle = 'black';
		let fPerc = Number(this.getBarPerc()).toPrecision(2);
  		ctx.fillText(`${fPerc} %`, (this.width/2)-this.width/5, position-10);
		ctx.closePath();

		//draw p2 percent

		ctx.beginPath();
		ctx.font = '48px serif';
		ctx.fillStyle = 'black';
  		ctx.fillText(`${(100-this.getBarPerc())}%`, this.width/2, position+40);
		ctx.closePath();

		console.debug('draw done')
	}
}

class Player {
	name;
	color;

	constructor(name: string, color: string){
		this.name = name;
		this.color = color;
	}
}