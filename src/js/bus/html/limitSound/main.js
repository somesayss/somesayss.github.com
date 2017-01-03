"use strict";

// 样式
import './style.less';

// 依赖
const $ = require('$');
const limit = require('limit');

// 颜色类
const Rainbow = require('modules/color/index');
// 画图类
const DrawCanvas = require('./drawCanvas');
const AudioBuffer = require('./audioBuffer');

let DC = new DrawCanvas({rotate: -90});
let RB = new Rainbow({totle: 360});
// new AudioBuffer({
// 	onAnalyser(arr){
// 		DC.clearRect();
// 		DC.drawArc();
// 		arr.forEach((val, key) => {
// 			key = key/2;
// 			DC.drawLine(key, val/10)
// 		});
// 	}
// });



new AudioBuffer({
	count: 360,
	onAnalyser(arr){
		DC.clearRect();
		arr.forEach((val, key) => {
			let theKey = key/2;
			let shodow = 360 - theKey;
			DC.drawLine(theKey, val/10, `rgb(${RB[key].join(',')})`);
			DC.drawLine(shodow, val/10);
		});
		let last = arr.length - 1;
		DC.drawLine(180, arr[last]/10, `rgb(${RB[last].join(',')})`);
		DC.drawArc();
	}
});