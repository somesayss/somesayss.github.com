"use strict";

// 依赖
const limit = require('limit');

function pullSome(){
	let AJAX = new XMLHttpRequest();

	AJAX.open('GET', '/file/1.gif');

	AJAX.responseType = 'arraybuffer';

	AJAX.onprogress = function(e){
		let total = e.total || AJAX.getResponseHeader('Conent-Length');
		console.log('progress', limit(e.loaded / total, e.timeStamp).toFixed(2).val());
	};

	AJAX.onload = function(e){
		console.log('onload', limit(e.timeStamp).toFixed().val());
	};

	AJAX.onerror = function(e){
		console.log('error', e);
	};

	AJAX.send(null);
};

pullSome();

function pushSome(){
	let AJAX = new XMLHttpRequest();

	AJAX.open('POST', '/common/upload.json');

	AJAX.upload.onprogress = function(e){
		let total = e.total;
		console.log('progress', limit(e.loaded / total, e.timeStamp).toFixed(2).val());
	};

	AJAX.upload.onload = function(e){
		console.log('loaded', e.timeStamp);
	};

	AJAX.upload.onerror = function(e){
		console.log('error', e);
	};

	AJAX.send( new Blob([new ArrayBuffer(10 * 1024 * 1024)]) );
};

// pushSome();