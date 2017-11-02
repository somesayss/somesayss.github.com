"use strict";

import './style.less';

const Mousemove = require('modules/mousemove/index');

// 组件类
class Cropper extends React.Component {
	getClassName(){
		let me = this;
		let {props} = me;
		let arr = ['limit-cropper'];
		if( props.className ){
			arr.push(props.className);
		};
		return arr.join(' ');
	}
	getCuteStyle(){
		let me = this;
		let {props} = me;
		let {width, height, top, left} = props;
		let backgroundPosition = `-${left}px -${top}px`;
		let backgroundImage = `url(${props.src})`;
		return {width, height, top, left, backgroundPosition, backgroundImage};
	}
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName()} ref="cropperContainer">
				<img src={props.src} />
				<div className="cropper-mock"></div>
				<div className="cropper-cute" 
					ref="cute" 
					style={me.getCuteStyle()} 
					onMouseDown={me.mousedown.bind(me)}></div>
			</div>
		);
	}
	getTheXY(diff, nowX, nowY, maxX, maxY){
		let theX = nowX + diff.diffX;
		let theY = nowY + diff.diffY;
		if( theX < 0 ){
			theX = 0;
		}else if( theX > maxX ){
			theX = maxX;
		};
		if( theY < 0 ){
			theY = 0;
		}else if( theY > maxY ){
			theY = maxY;
		};
		return {theX, theY};
	}
	mousedown(e){
		let me = this;
		let {refs} = me;
		let {cute, cropperContainer} = refs;
		let nowX = parseInt( cute.style.left );
		let maxX = cropperContainer.offsetWidth - cute.offsetWidth;
		let nowY = parseInt( cute.style.top );
		let maxY = cropperContainer.offsetHeight - cute.offsetHeight;
		new Mousemove(e).on('move', (e, diff) => {
			let {theX, theY} = me.getTheXY(diff, nowX, nowY, maxX, maxY);
			cute.style.left = `${theX}px`;
			cute.style.top = `${theY}px`;
			cute.style.backgroundPosition = `-${theX}px -${theY}px`;
		}).on('mouseup', (e, diff) => {
			let {theX, theY} = me.getTheXY(diff, nowX, nowY, maxX, maxY);
			Actions(me).changePos(theX, theY);
		});
	}

};

module.exports = Cropper;

