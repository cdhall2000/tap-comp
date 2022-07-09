// const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000
const host = '192.168.1.101'


const pages = '/public/html/'
const static = '/public/static'

app.use('/static', express.static(__dirname + static));


app.get('/', (req, res) => {
	var message = `
  node server for tap-comp... <br>
  did you mean to go to <a href="/dev">dev</a>?
  `;
	res.send(message)

	/* //Log call
	let reqIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
	let reqISOString = new Date().toISOString()
	let s = reqISOString.split('T');
	let reqTimeStamp = '(' + s[0] + ')' + ' ' + s[1];

	console.debug(`${reqTimeStamp} ==> ${req.method} request on route ${req.url} accessed by ${reqIP} `) */

	logCall(req)
})

app.get('/dev', (req, res) => {

	res.sendFile(path.join(__dirname, `${pages}game.html`))

	/* //Log calls
	let reqIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
	let reqISOString = new Date().toISOString()
	let s = reqISOString.split('T');
	let reqTimeStamp = '(' + s[0] + ')' + ' ' + s[1];

	console.debug(`${reqTimeStamp} ==> ${req.method} request on route ${req.url} accessed by ${reqIP} `) */

	logCall(req)

})

app.get('/index', (req, res) => {
	res.sendFile(path.join(__dirname, `${pages}index.html`))

	logCall(req)

	/* ///Log call
	let reqIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
	let reqISOString = new Date().toISOString()
	let s = reqISOString.split('T');
	let reqTimeStamp = '(' + s[0] + ')' + ' ' + s[1]; 

	console.debug(`${reqTimeStamp} ==> ${req.method} request on route ${req.url} accessed by ${reqIP} `) */
})

app.post('/debug', (req, res) => {
	res.send('received')

	console.debug(req.body)

	logCall(req)

	/* ///Log call
	let reqIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
	let reqISOString = new Date().toISOString()
	let s = reqISOString.split('T');
	let reqTimeStamp = '(' + s[0] + ')' + ' ' + s[1]; 

	console.debug(`${reqTimeStamp} ==> ${req.method} request on route ${req.url} accessed by ${reqIP} `) */
})

app.listen(port, host, () => {
	console.log(`Express JS listening at ${host} on port ${port}`)
})

function logCall(req) {
	let reqIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress
	let reqISOString = new Date().toISOString()
	let s = reqISOString.split('T');
	let reqTimeStamp = '(' + s[0] + ')' + ' ' + s[1];

	console.debug(`${reqTimeStamp} ==> '${req.method}' from ${reqIP} to '${req.url}'`)
}
