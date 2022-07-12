//@ts-check
console.debug(`apps.js- beginning of script`);

import { TapEngine } from './TapEngine.js'

//Variable Declarations

/* 
//Variables
 */
var gEngine: TapEngine;

gEngine = new TapEngine('thegame');

gEngine.gv.width = document.body.clientWidth; //document.width is obsolete
gEngine.gv.height = document.body.clientHeight; //document.height is obsolete

gEngine.increment = 0.05;

gEngine.startGame();
/* 

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

 */
//File Loads
console.debug('tapcomp.js entry');

