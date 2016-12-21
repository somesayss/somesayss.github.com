"use strict";

// 依赖
const limit = require('limit');
const Audio = require('modules/audio/index');

class viewAudio extends Audio{
	props = {
		element: null //置入的元素默认是body
		,width: 200 //宽
		,height: 40 //高
		,part: 10 //个数
		,space: 5 //间隔
		,radius: 4 //半角
		,increase: 30 //增强[0~50]
		,color: '#4d90fe' //颜色
		,changeArray(arr){
			let me = this;
			let state = me.state;
			let length = arr.length;
			length = length - length * state.increase / 100;
			let res = arr.reduce((a, b) => a + b) / length;
			res = limit(res).except(256).multiply(10).toFixed().val();
			me.drawCanvas(res);
		}
	}
	context = null //画布
	canvas = null //画布节点
	constructor(config){
		super(...arguments);
		let me = this
		limit.assignSuper(me.state, me.props, config);
		me.initElement();
	}
	destroy(){
		let me = this;
		me.stop();
		let div = document.createElement('div');
		div.appendChild(me.canvas);
		div.innerHTML = '';
		div = null;
	}
	viewCanvas(){
		let me = this;
		me.initCanvas();
		me.getUserMediaArray().then(() => {
			me.start();
		});
	}
	initElement(){
		let me = this;
		let state = me.state;
		if( state.element ){
			me.element = state.element;
		}else{
			me.element = document.body;
		};
	}
	initCanvas(){
		let me = this;
		let state = me.state;
		let canvas = document.createElement('canvas');
		me.canvas = canvas;
		me.element.appendChild(canvas);
		canvas.width = state.width;
		canvas.height = state.height;
		me.context = canvas.getContext('2d');
	}
	drawCanvas(min){
		let me = this;
		let state = me.state;
		let context = me.context;
		me.parseData().forEach((val, key) => {
			context.fillStyle = '#CCC';
			if( key < min ){
				context.fillStyle  = state.color;
			};
			me.roundRect.apply(context, [...val, state.radius]);
		});
	}
	roundRect(x, y, w, h, r){
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
	}
	parseData(){
		let me = this;
		let state = me.state;
		let maxWidth = state.width - state.space * state.part;
		let oneMaxWidth = Math.floor( maxWidth / state.part );
		return limit.from(new Array(state.part)).map((val, key) => {
			let top = (oneMaxWidth + state.space) * key;
			return [top, 0, oneMaxWidth, state.height];
		});
	}
}
// 0 20 
module.exports = viewAudio;