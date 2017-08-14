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

	module.exports = __webpack_require__(128);


/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = limit;

/***/ },

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// 依赖
	
	var limit = __webpack_require__(8);
	
	function pullSome() {
		var AJAX = new XMLHttpRequest();
		var BT = new Date().getTime();
	
		AJAX.open('GET', '/file/1.gif');
	
		AJAX.responseType = 'arraybuffer';
	
		AJAX.onprogress = function (e) {
			var total = e.total || AJAX.getResponseHeader('Conent-Length');
			console.log('progress', limit(e.loaded / total).toFixed(2).val());
		};
	
		AJAX.onload = function (e) {
			var ET = new Date().getTime();
			console.log('onload', limit(ET - BT).toFixed().val());
		};
	
		AJAX.onerror = function (e) {
			console.log('error', e);
		};
	
		AJAX.send(null);
	};
	
	pullSome();
	
	window.pullSome = pullSome;
	
	function pushSome() {
		var AJAX = new XMLHttpRequest();
	
		AJAX.open('POST', '/common/upload.json');
	
		AJAX.upload.onprogress = function (e) {
			var total = e.total;
			console.log('progress', limit(e.loaded / total, e.timeStamp).toFixed(2).val());
		};
	
		AJAX.upload.onload = function (e) {
			console.log('loaded', e.timeStamp);
		};
	
		AJAX.upload.onerror = function (e) {
			console.log('error', e);
		};
	
		AJAX.send(new Blob([new ArrayBuffer(10 * 1024 * 1024)]));
	};
	
	// pushSome();

/***/ }

/******/ });
//# sourceMappingURL=main.js.map