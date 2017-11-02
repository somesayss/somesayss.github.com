"use strict";

// 依赖
const limit = require('limit');

class Copy {
	props = {
		text: ''
	}
	state = {}
	constructor(config){
		let me = this;
		limit.assign(me.state, me.props, config);
		return me.emoveHideArea( me.creatHideArea() );
	}
	creatHideArea(){
		let me = this;
		let {state} = me;
		let area = document.createElement('textarea');
		area.style['position'] = 'absolute';
		area.style['left'] = '-99999px';
		document.body.appendChild(area);
		area.value = state.text;
		area.select();
		try{
			me.H5copy();
		}catch(e){
			state.copySuccess = false;
		};
		return area;
	}
	H5copy(){
		let me = this;
		let {state} = me;
		state.copySuccess = document.execCommand('copy', false, null);
	}
	IEcopy(val){
		window.clipboardData.setData('text', val);
	}
	emoveHideArea(area){
		let me = this;
		let {state} = me;
		let div = document.createElement('div');
		div.appendChild(area);
		div.innerHTML = '';
		div = null;
	}
	isCopySuccess(){
		return this.state.copySuccess;
	}
}

module.exports = Copy;


















