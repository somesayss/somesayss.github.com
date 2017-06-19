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
				<Input type="file" value="选择图片" onChange={me.change.bind(me)} />
				<FilesDrop className="fn-ML15" onDrop={me.drop.bind(me)} />
				<Input type="button" value="预 览" className="fn-ML15" onClick={me.viewImg.bind(me)} />
				<Input type="button" value="上 传" className="fn-ML15" onClick={me.saveImg.bind(me)} />
				<Input type="button" value="视图更新" className="fn-ML15" onClick={Actions(me).changeView} />
				<br />
				<div className="ch-canvas fn-MT15" ref="boxCanvas">
					<canvas ref="theCanvas" className="fn-hide" width="200" height="200"></canvas>
					<img ref="img"/>
					<div className="ch-mock"></div>
					<div className="ch-cute" ref="cute" style={{top:0,left:0}} onMouseDown={me.mousedown.bind(me)}></div>
				</div>
				<br />
				<Cropper src={props.src} top="0" left="0"/>
			</div>
		);
	}
	mousedown(e){
		let me = this;
		let {refs} = me;
		let {cute, boxCanvas} = refs;
		let nowX = parseInt( cute.style.left );
		let maxX = boxCanvas.offsetWidth - cute.offsetWidth;
		let nowY = parseInt( cute.style.top );
		let maxY = boxCanvas.offsetHeight - cute.offsetHeight;
		new Mousemove(e).on('move', (e, diff) => {
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
			cute.style.left = `${theX}px`;
			cute.style.top = `${theY}px`;
			cute.style.backgroundPosition = `-${theX}px -${theY}px`;
		});
	}
	kissFile(file){
		let me = this;
		let {refs} = me;
		let {img, cute} = refs;
		me.readFile(file).then((url) => {
			URL.revokeObjectURL(me.url);
			me.url = url;
			// img.onload = () => { me.drawImg(img) };
			img.src = url;
			cute.style.left = `0`;
			cute.style.top = `0`;
			cute.style.backgroundPosition = `0 0`;
			cute.style.backgroundImage = `url(${url})`;

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
		let {refs} = me;
		let {theCanvas, img} = refs;
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
		let {refs} = me;
		let {theCanvas, img} = refs;
		me.drawImg(img);
		window.open(theCanvas.toDataURL());
	}
	drawImg(img){
		let me = this;
		let {refs} = me;
		let {theCanvas, cute} = refs;
		let cxt = me.cxt = theCanvas.getContext('2d');
		cxt.drawImage(img, -parseInt( cute.style.left ), -parseInt( cute.style.top ));
	}
};

module.exports = Imgcute;

