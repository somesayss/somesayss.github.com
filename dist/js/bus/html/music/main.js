/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(122);


/***/ },

/***/ 7:
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = limit;

/***/ },

/***/ 122:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var $ = __webpack_require__(7);
	var limit = __webpack_require__(8);
	
	var file = document.getElementById('file');
	var audio = document.getElementById('audio');
	
	var readerUrl = new FileReader();
	var readerBuffer = new FileReader();
	
	var audioContext = new window.AudioContext();
	var analyser = audioContext.createAnalyser();
	var audioBufferSouceNode = audioContext.createBufferSource();
	
	window.A1 = audioBufferSouceNode;
	
	var canvas = null;
	var context = null;
	
	function getRealBuffer(buffer) {
		return new Promise(function (resolve, reject) {
			audioContext.decodeAudioData(buffer, resolve, reject);
		});
	};
	
	function bindAudioWithBuffer(buffer) {
		audioBufferSouceNode.connect(analyser);
		analyser.connect(audioContext.destination);
		audioBufferSouceNode.buffer = buffer;
		audioBufferSouceNode.start();
	};
	
	function initCanvas() {
		canvas = document.createElement('canvas');
		document.body.appendChild(canvas);
		canvas.width = 200;
		canvas.height = 40;
		context = canvas.getContext('2d');
	};
	initCanvas();
	
	function parseData() {
		var maxWidth = 200 - 5 * 10;
		var oneMaxWidth = Math.floor(maxWidth / 10);
		return limit.from(new Array(10)).map(function (val, key) {
			var top = (oneMaxWidth + 5) * key;
			return [top, 0, oneMaxWidth, 40];
		});
	};
	
	function drawCanvas(min) {
		return parseData().forEach(function (val, key) {
			context.fillStyle = '#CCC';
			if (key < min) {
				context.fillStyle = '#4d90fe';
			};
			roundRect.apply(context, [].concat(_toConsumableArray(val), [3]));
		});
	};
	
	function roundRect(x, y, w, h, r) {
		var context = this;
		var max = Math.min(w, h);
		if (r > max / 2) {
			r = max / 2;
		};
		context.beginPath();
		context.moveTo(x + r, y);
		context.arcTo(x + w, y, x + w, y + h, r);
		context.arcTo(x + w, y + h, x, y + h, r);
		context.arcTo(x, y + h, x, y, r);
		context.arcTo(x, y, x + w, y, r);
		context.closePath();
		context.fill();
	};
	
	function drawAudio() {
		var leg = analyser.frequencyBinCount;
		var array = new Uint8Array(leg);
		analyser.getByteFrequencyData(array);
		var num = array.reduce(function (a, b) {
			return a + b;
		}) / leg;
		drawCanvas(limit(num / 256 * 10).toFixed().val());
		requestAnimationFrame(drawAudio);
	};
	
	readerUrl.onload = function (e) {
		audio.src = e.target.result;
		audio.play();
	};
	
	readerBuffer.onload = function (e) {
		var buffer = e.target.result;
		return getRealBuffer(buffer).then(function (buffer) {
			return bindAudioWithBuffer(buffer);
		}).then(function () {
			return drawAudio();
		});
	
		// let blob = new Blob([buffer]);
		// audio.src = window.URL.createObjectURL(blob);
		// audio.play();
	};
	
	file.onchange = function (e) {
		var data = file.files[0];
		readerBuffer.readAsArrayBuffer(data);
	};

/***/ }

/******/ });
//# sourceMappingURL=main.js.map