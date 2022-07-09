console.debug("tapcomp.js start");

const GameSpace = document.getElementById("thegame");

var currentPercent = 0.5;
var increment = 0.05;

if (GameSpace.getContext) {
	console.debug("canvas found");

	const resize = () => {
		GameSpace.width = window.innerWidth;
		GameSpace.height = window.innerHeight;
	};

	resize();
	//window.addEventListener("resize", resize);

	GameSpace.width = document.body.clientWidth; //document.width is obsolete
	GameSpace.height = document.body.clientHeight; //document.height is obsolete
	var canvasW = GameSpace.width;
	var canvasH = GameSpace.height;

	var hPoint = canvasH / 100;


	var ctx = GameSpace.getContext("2d");



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
			if (touch.Y < canvasH/2) {
				currentPercent += increment;
				drawAtPercentage(currentPercent);
				console.debug('increment increased')
			} else if (touch.Y > canvasH/2) {
				currentPercent -= increment;
				drawAtPercentage(currentPercent);
				console.debug('increment decreased')
			}

			TouchArray.push(touch);
		};
	});
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

	function drawAtPercentage(percentage) {
		//clear entire canvas
		ctx.beginPath();
		ctx.clearRect(0, 0, canvasW, canvasH);
		ctx.closePath();



		//draw red
		ctx.beginPath();
		ctx.rect(0, 0, canvasW, canvasH * percentage)
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.closePath();

		//draw blue

		//xy starts at top right of rect
		/* 
			blue height = (1-percentace) * canvas height
			blue y = canvas height - blue height in px
		 */

		ctx.beginPath();

		ctx.rect(0, (canvasH - canvasH * (1 - percentage)), canvasW, canvasH * (1 - percentage))
		ctx.fillStyle = "blue";
		ctx.fill();
		ctx.closePath();

		//draw black
		ctx.beginPath();
		let hPoint = canvasH / 100
		ctx.rect(0, (canvasH * percentage) - (hPoint / 2), canvasW, hPoint)
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();

		console.debug('draw done')
	}


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



} else {
	console.error("canvas does not exist???");
}






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