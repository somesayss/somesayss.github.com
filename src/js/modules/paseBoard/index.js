"use strict";

// 依赖
const limit = require('limit');

class PaseBoard {
	constructor(text){
		return this.init( limit.toString(text) );
	}
	init(text){
		let me = this;
		return new Promise((resolve, reject) => {
			me.creatHideArea();
			try{
				me.area.value = text;
				me.area.select();
				document.execCommand('copy');
				resolve();
			}catch(e){
				reject(e);
			};
			me.removeHideArea();
		});
	}
	creatHideArea(){
		let me = this;
		let area = me.area = document.createElement('textarea');
		area.style['position'] = 'absolute';
		area.style['left'] = '-99999px';
		document.body.appendChild(area);
	}
	removeHideArea(){
		let me = this;
		let div = document.createElement('div');
		div.appendChild(me.area);
		div.innerHTML = '';
		div = null;
	}
}

module.exports = PaseBoard;