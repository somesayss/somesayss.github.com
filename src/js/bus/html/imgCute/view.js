"use strict";

import './style.less';

const Input = require('modules/input/index');
const Mousemove = require('modules/mousemove/index');
const FilesDrop = require('modules/filesdrop/index');
const Ajax = require('modules/ajax/index');
const DialogWidget = require('modules/dialog/widget');
const Cropper = require('modules/cropper/index');

// 组件类
class Imgcute extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className="imgcute">
				<FilesDrop  onDrop={me.drop.bind(me)} />
				<Input type="file" value="选择图片" className="fn-ML15" onChange={me.change.bind(me)} />
				<Input type="button" value="预 览" className="fn-ML15" onClick={me.viewImg.bind(me)} />
				<Input type="button" value="上 传" className="fn-ML15" onClick={me.saveImg.bind(me)} />
				<br />
				<br />
				<canvas className="fn-hide" ref="theCanvas" width="200" height="200" />
				<Cropper ref="cropper" src={props.src} top={props.y} left={props.x} onChangePos={Actions(me).changePos}/>
			</div>
		);
	}
	kissFile(file){
		let me = this;
		let {refs} = me;
		let {img, cute} = refs;
		me.readFile(file).then((url) => {
			URL.revokeObjectURL(me.url);
			Actions(me).changeSrc(url);
		});
	}
	drop(e){
		let me = this;
		me.kissFile(e.dataTransfer.files[0]);
	}
	change(e){
		let me = this;
		me.kissFile(e.target.files[0]);
	}
	saveImg(){
		let me = this;
		let {refs, props} = me;
		let {theCanvas} = refs;
		let img = new Image();
		img.src = props.src;
		me.drawImg(img);
		new Ajax({
			url: '/common/database64.json',
			type: 'post',
			data: {
				database: theCanvas.toDataURL()
			}
		}).then((val) => {
			DialogWidget.success(val);
		});
	}
	readFile(file){
		// 方式一：解析成database64
		// return new Promise((r, j) => {
		// 	let reader = new FileReader();
		// 	reader.onload = (e) => {
		// 		r(reader.result);
		// 	};
		// 	reader.readAsDataURL(file);
		// });
		// 方式二：URL.createObjectURL 销毁方法 URL.revokeObjectURL
		return new Promise((r, j) => {
			r(URL.createObjectURL(file));
		});
	}
	viewImg(){
		let me = this;
		let {props, refs} = me;
		let {theCanvas} = refs;
		let img = new Image();
		img.src = props.src;
		me.drawImg(img);
		window.open(theCanvas.toDataURL());
	}
	drawImg(img){
		let me = this;
		let {refs, props} = me;
		let {theCanvas, cute} = refs;
		let cxt = me.cxt = theCanvas.getContext('2d');
		cxt.drawImage(img, -props.x, -props.y);
	}
};

module.exports = Imgcute;

