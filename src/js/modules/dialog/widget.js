"use strict";

// 依赖
const Widget = require('common/myReflux/widget');
const originClass = require('./index');

class originWidget extends Widget {
	static originClass = originClass
	setCenter(){
		let me = this;
		Actions(me.componentExp).setCenter();
	}
	static loading(){
		return new originWidget({
			className: 'widget-loading',
			width: 200,
			height: 2,
			opacity: 0
		}, null, <i className="ch-load"></i>);
	}
	static success(info){
		return new originWidget({
			className: 'widget-success',
			width: 'auto',
			height: 'auto',
			maxWidth: 300,
			opacity: 0,
			timeout: 3000
		}, null, <div className="ch-text"><i className="ch-logo">√</i>{info||'操作成功'}</div>);
	}
	static error(info){
		return new originWidget({
			className: 'widget-error',
			width: 'auto',
			height: 'auto',
			maxWidth: 300,
			opacity: 0,
			timeout: 3000
		}, null, <div className="ch-text"><span className="ch-logo">×</span>{info||'操作失败'}</div>);
	}
};

module.exports = originWidget;