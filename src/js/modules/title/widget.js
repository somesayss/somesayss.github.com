"use strict";

// 依赖
const limit = require('limit');
const originClass = require('./index');
const Widget = require('common/myReflux/widget');

class originWidget extends Widget {
	static originClass = originClass
	static use = (element, config, limitLength) => {
		return new UseTitle(element, config, limitLength);
	}
};

class UseTitle {
	constructor(element, config, limitLength = -1){
		let me = this;
		me.element = $(element);
		me.config = config;
		me.limitLength = limitLength;
		me.bindEvent();
	}
	destroy(){
		let me = this;
		let {element} = me;
		element.off('mouseenter.title').off('mouseleave.title');
	}
	bindEvent(){
		let me = this;
		let {element, config, limitLength} = me;
		let txt;
		let tit;
		element.on('mouseenter.title', '[title]', (e) => {
			let node = $(e.target);
			txt = node.prop('title');
			node.prop('title', '');
			tit = null;
			if( txt && txt.length >= limitLength ){
				tit = new originWidget(config, null, txt);
			};
		});
		element.on('mouseleave.title', '[title]', (e) => {
			let node = $(e.target);
			txt && node.prop('title', txt);
			tit && tit.destroy();
		});
	}
};

module.exports = originWidget;