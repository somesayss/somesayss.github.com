"use strict";

// 依赖
const limit = require('limit');

class DrawCanvas {
	props = {
		element: null,
		radius: 200,
		rotate: 0,
		arcColor: '#000'
	}
	state = {}
	canvas = null
	element = null
	context = null
	constructor(config){
		let me = this;
		limit.assign(me.state, me.props, config);
		me.initElement();
		me.initCanvas();
		me.drawArc();
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
		let element = me.element;
		let canvas = document.createElement('canvas');
		let context = canvas.getContext('2d');
		element.appendChild(canvas);
		canvas.width = element.clientWidth;
		canvas.height = element.clientHeight;
		me.canvas = canvas;
		me.context = context;
		state.centerX = canvas.width / 2;
		state.centerY = canvas.height / 2;
	}
	drawArc(){
		let me = this;
		let state = me.state;
		let canvas = me.canvas;
		let context = me.context;
		context.beginPath();
		context.arc( state.centerX, state.centerY, state.radius, 0,  me.getRadianByAngle(360) );
		context.closePath();
		context.strokeStyle = state.arcColor;
		context.stroke();
	}
	drawLine(angle, range, color){
		let me = this;
		let state = me.state;
		let context = me.context;
		context.beginPath();
		context.moveTo.apply(context, me.compute(angle + state.rotate, state.radius) );
		context.lineTo.apply(context, me.compute(angle + state.rotate, state.radius + range) );
		context.closePath();
		context.strokeStyle = color;
		context.stroke();
	}
	clearRect(){
		let me = this;
		let canvas = me.canvas;
		me.context.clearRect(0, 0, canvas.width, canvas.height);
	}
	drawRect(){
		// ...
	}
	compute(angle, radius){ // 通过角度，半径计算点
		let me = this;
		let state = me.state;
		let x = Math.cos( me.getRadianByAngle(angle) ) * radius + state.centerX;
		let y = Math.sin( me.getRadianByAngle(angle) ) * radius + state.centerY;
		return [x, y];
	}
	getRadianByAngle(angle){
		return angle / 180 * Math.PI;
	}
};

module.exports = DrawCanvas;