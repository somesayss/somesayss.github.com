"use strict";

// 依赖
const $ = require('$');
const limit = require('limit');

let file = document.getElementById('file');
let audio = document.getElementById('audio');

let readerUrl  = new FileReader();
let readerBuffer  = new FileReader();

let audioContext = new window.AudioContext();
let analyser = audioContext.createAnalyser();
let audioBufferSouceNode = audioContext.createBufferSource();

window.A1 = audioBufferSouceNode;

let canvas = null;
let context = null;

function getRealBuffer(buffer){
	return new Promise((resolve, reject) => {
		audioContext.decodeAudioData(buffer, resolve, reject);
	});
};

function bindAudioWithBuffer(buffer){
	audioBufferSouceNode.connect(analyser);
	analyser.connect(audioContext.destination);
	audioBufferSouceNode.buffer = buffer;
	audioBufferSouceNode.start();
};

function initCanvas(){
	canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	canvas.width = 200;
	canvas.height = 40;
	context = canvas.getContext('2d');
};
initCanvas();

function parseData(){
	let maxWidth = 200 - 5 * 10;
	let oneMaxWidth = Math.floor( maxWidth / 10 );
	return limit.from(new Array(10)).map((val, key) => {
		let top = (oneMaxWidth + 5) * key;
		return [top, 0, oneMaxWidth, 40];
	});
};

function drawCanvas(min){
	return parseData().forEach((val, key) => {
		context.fillStyle = '#CCC';
		if( key < min ){
			context.fillStyle  = '#4d90fe';
		};
		roundRect.apply(context, [...val, 3]);
	});
};

function roundRect(x, y, w, h, r){
	let context = this;
	let max = Math.min(w, h);
	if( r > max/2 ){
		r = max/2;
	};
	context.beginPath();
	context.moveTo(x+r, y);
	context.arcTo(x+w, y, x+w, y+h, r);
	context.arcTo(x+w, y+h, x, y+h, r);
	context.arcTo(x, y+h, x, y, r);
	context.arcTo(x, y, x+w, y, r);
	context.closePath();
	context.fill();
};

function drawAudio(){
	let leg = analyser.frequencyBinCount;
	let array = new Uint8Array(leg);
    analyser.getByteFrequencyData(array);
    let num = array.reduce((a,b) => a + b) / leg;
    drawCanvas( limit(num/256*10).toFixed().val() );
    requestAnimationFrame(drawAudio);
};

readerUrl.onload = (e) => {
	audio.src = e.target.result;
	audio.play();
};

readerBuffer.onload = (e) => {
	let buffer = e.target.result;
	return getRealBuffer(buffer).then((buffer) => {
		return bindAudioWithBuffer(buffer);
	}).then(() => {
		return drawAudio();
	});

	// let blob = new Blob([buffer]);
	// audio.src = window.URL.createObjectURL(blob);
	// audio.play();
};

file.onchange = (e) => {
	let data = file.files[0];
	readerBuffer.readAsArrayBuffer(data);
};








