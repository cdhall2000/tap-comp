console.debug("tapcomp.js entry");
////
//Variables

/* 

var GameViewer;
let cfx;
 */




/* function window_loaded() {
	console.debug('the page has loaded');

	init();

	start();

	loop();

} */

// Startup Code


var GameViewer = document.getElementById('thegame');
var TapEngine;
setTimeout(gotContext, 250);

function gotContext () {
	console.debug("canvas found");

	TapEngine = new TapGame(0.01, false, GameViewer);

	const resize = () => {
		GameViewer.width = window.innerWidth;
		GameViewer.height = window.innerHeight;
	};

	resize();

	GameViewer = document.getElementById("thegame");

	GameViewer.width = document.body.clientWidth; //document.width is obsolete
	GameViewer.height = document.body.clientHeight; //document.height is obsolete
	TapEngine.canvasW = GameViewer.width;
	TapEngine.canvasH = GameViewer.height;

	TapEngine.ctx = GameViewer.getContext("2d");
	TapEngine.gv.addEventListener('touchstart', (event) => {
		TapEngine.tstart(event)
	})

	loop();

}

function loop() {
	TapEngine.looping = true
	let startTime = new Date()

	fps = 20;

	fps = 1/fps * 100;

	/* 
	in ms to times per second

	1/times * 1000
	*/
	TapEngine.IntervalID = setInterval(() => {
		TapEngine.tick();
		console.debug('tick');

	}, fps);
}



var currentPercent = 0.5;
var increment = 0.05;

/* if (GameViewer.getContext) {
	console.debug("canvas found");

	const resize = () => {
		GameViewer.width = window.innerWidth;
		GameViewer.height = window.innerHeight;
	};

	resize();
	//window.addEventListener("resize", resize);

	GameViewer.width = document.body.clientWidth; //document.width is obsolete
	GameViewer.height = document.body.clientHeight; //document.height is obsolete
	canvasW = GameViewer.width;
	canvasH = GameViewer.height;

	drawAtPercentage(currentPercent);



	document.addEventListener('keypress', (event) => {
		if (event.key === "=") {
			currentPercent += increment
			drawAtPercentage(currentPercent);
		}
		else if (event.key === "-") {
			currentPercent -= increment
			drawAtPercentage(currentPercent);
		}
		console.debug(`key ${event.key} was pressed and percentage is at ${currentPercent}`)
	});

	const TouchArray = [];
	// Create touchstart handler
	document.addEventListener('touchstart', (event) => {
		// Iterate through the touch points that were activated
		// for this element and process each event 'target'
		let touches = event.touches;
		for (var i = 0; i < touches.length; i++) {
			//process_touch(event.targetTouches[i])
			let touch = {
				X: touches[i].clientX,
				Y: touches[i].clientY,
				force: touches[i].force,
				identifier: touches[i].identifier
			}
			if (touch.Y < canvasH / 2) {
				currentPercent += increment;
				drawAtPercentage(currentPercent);
				console.debug('increment increased')
			} else if (touch.Y > canvasH / 2) {
				currentPercent -= increment;
				drawAtPercentage(currentPercent);
				console.debug('increment decreased')
			}

			TouchArray.push(touch);
		};
	}); */
	/* document.addEventListener('touchend', (event) => {
		// Iterate through the touch points that were activated
		// for this element and process each event 'target'
		console.debug('touch end events')
		let touches = event.touches;
		for (var i = 0; i < touches.length; i++) {
			//process_touch(event.targetTouches[i])
			let touch = {
				X: touches[i].clientX,
				Y: touches[i].clientY,
				force: touches[i].force,
				identifier: touches[i].identifier
			}
			let TouchObj = TouchArray[touch.identifier];
			if (TouchObj.Y < canvasH/2) {
				currentPercent += increment;
				drawAtPercentage(currentPercent);
				console.debug('increment increased')
			} else if (TouchObj.Y > canvasH/2) {
				currentPercent -= increment;
				drawAtPercentage(currentPercent);
				console.debug('increment decreased')
			}
	
			let ta = [];
			for (var i = 0; i < TouchArray.length; i++) {
				if (TouchArray[i].identifier === touch.identifier) { 
					console.debug(`Touch Array [${i}] was removed`);
				} else {
					ta.push(TouchArray[i]);
				}
			}
			TouchArray = new Array(ta);
	
		};
	});
	
 */

	function process_touch_debug(event, post = false) {
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
			touchJSON = JSON.stringify(touch);
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

	/* document.addEventListener('touchstart', (event) => {
		if (event.key === "=") {
			currentPercent += increment
			drawAtPercentage(currentPercent);
		}
		else if (event.key === "-") {
			currentPercent -= increment
			drawAtPercentage(currentPercent);
		}
		console.debug(`key ${event.key} was pressed and percentage is at ${currentPercent}`)
	}); */

	


	/* ctx.beginPath();
	ctx.rect(0, 0, canvasW, canvasH / 2);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();
	
	ctx.beginPath();
	ctx.rect(0, canvasH / 2, canvasW, canvasH / 2);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
	
	ctx.beginPath();
	
	ctx.rect(0, (canvasH / 2)-(hPoint/2), canvasW, hPoint);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
	
	GameSpace.addEventListener('click', function() => {
		return;
	}); */






/* function init()
{
	canvas = document.getElementById("thegame");
	canvas.width = document.body.clientWidth; //document.width is obsolete
	canvas.height = document.body.clientHeight; //document.height is obsolete
	canvasW = canvas.width;
	canvasH = canvas.height;
	
	if( canvas.getContext )
	{
		setup();
		setInterval( run , 33 );
	}
}
	
function setup () {
	
}
	
function run() {
	
} */

//File Loads
console.debug('tapcomp.js entry');


class TapGame {
	constructor(increment = 0.01, use_history = false, gv) {
		this.increment = increment;

		this.tic = 0;
		this.tickSpeed;

		this.bar = 0.5; //Percentage of the screen from the to]

		this.gv = GameViewer;

		this.intervalID;

		this.canvasW = gv.width;
		this.canvasH = gv.height;
		this.TouchArray = [];

		this.prevBar = 0.5;
		
		this.ctx = this.gv.getContext("2d");

		if (use_history) {
			console.log('get hisotry from server');
		} else {
			this.id = new Date().toISOString();
			this.player1 = new Player('p1', 'red');
			this.player2 = new Player('p2', 'blue');
		}

		
	}
	
	tick() {
		//get location
		let bar = this.bar;

		if (bar >= 1 || bar <= 0) {
			
			let winner;
			if (bar >= 1 ) {winner = 'p1'}
			if (bar <= 1 ) {winner = 'p2'}
			alert(`game over ${winner} is the winner!`);
			this.bar = 0.5;
			
		}

		if (bar != this.prevBar) {
			this.drawAtPercentage(bar);
		}
		if (this.tic === 0) {
			this.drawAtPercentage(bar);
		}
		this.prevBar = bar;
		
		this.tic++
	}
	tstart (event) {
		let touches = event.touches;
		for (var i = 0; i < touches.length; i++) {
			//process_touch(event.targetTouches[i])
			let touch = {
				X: touches[i].clientX,
				Y: touches[i].clientY,
				force: touches[i].force,
				identifier: touches[i].identifier
			}
			let bar = this.bar
			if (touch.Y < this.canvasH * bar) {
				//this.player1.tap()
				bar += this.increment;
				console.debug('increment increased')

			} else if (touch.Y > this.canvasH / 2) {
				//this.player2.tap()
				bar -= this.increment;
				console.debug('increment decreased')
			}

			this.bar = bar;

			//this.TouchArray.push(touch);
		};
	}

	drawAtPercentage(percentage) {
		console.debug('starting to draw')

		let canvasH = this.canvasH;
		let canvasW = this.canvasW;

		let ctx = this.ctx;
		//clear entire canvas
		ctx.beginPath();
		ctx.clearRect(0, 0, canvasW, canvasH);
		ctx.closePath();
		
		//draw player 1 
		ctx.beginPath();
		ctx.rect(0, 0, canvasW, canvasH * percentage)
		ctx.fillStyle = this.player1.color;
		ctx.fill();
		ctx.closePath();

		//draw player2

		ctx.beginPath();

		let p2_x = 0;
		let p2_y = (canvasH - canvasH * (1 - percentage));
		let p2_w = canvasW;
		let p2_h = canvasH * (1 - percentage);
		

		ctx.rect(p2_x,p2_y,p2_w,p2_h)
		ctx.fillStyle = this.player2.color;
		ctx.fill();
		ctx.closePath();

		//draw margin

		ctx.beginPath();


		ctx.rect(0, (canvasH * percentage)-((canvasH/100) / 2), canvasW, canvasH / 100);
		ctx.fillStyle = "black";

		ctx.fill();

		ctx.closePath();

		//draw p1 percent

		ctx.beginPath();
		ctx.font = '48px serif';
		ctx.fillStyle = 'black';
		let fPerc = percentage*100;
		fPerc = Number(fPerc).toPrecision(2);
  		ctx.fillText(`${fPerc} %`, (this.canvasW/2)-this.canvasW/5, (this.canvasH*this.bar)-10);
		ctx.closePath();

		//draw p2 percent

		ctx.beginPath();
		ctx.font = '48px serif';
		ctx.fillStyle = 'black';
  		ctx.fillText(`${(100-fPerc)}%`, this.canvasW/2, (this.canvasH*this.bar)+40);
		ctx.closePath();

		console.debug('draw done')
	}
}

class Player {
	constructor(name, color) {
		this.name = name;
		this.color = color;
		this.tap = new Tap();
		this.wins = 0;
		this.loses = 0;
		this.games = 0;
	}

	tap() {
		if (this.tap == false) {
			goodTap()
		}
		if (this.tapLock) {
			return true;
		}
	}


}

class Tap {
	constructor(tapGrace = 200) {
		this.grace = tapGrace; //Grace between taps in MS
		this.lock = false;
		this.lastTap = 0;
	}

	tap() {
		if (this.lock === false) {
			this.lock = true;
			this.lastTap = gameTick;
			return true;
		} else {
			if (checkTap(gameTick)) {
				this.lock = false;
				return false;
			}
		}
	}
}
