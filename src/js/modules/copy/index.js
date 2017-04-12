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
		me.emoveHideArea( me.creatHideArea() );
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
		me.H5copy();
		return area;
	}
	H5copy(){
		document.execCommand('copy');
	}
	IEcopy(val){
		window.clipboardData.setData('text', val);
	}
	emoveHideArea(area){
		let div = document.createElement('div');
		div.appendChild(area);
		div.innerHTML = '';
		div = null;
	}
}

module.exports = Copy;


















