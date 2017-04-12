"use strict";

// 依赖
const limit = require('limit');
const originClass = require('./index');
const Widget = require('common/myReflux/widget');

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
	static success(info, config){
		return new originWidget(  limit.assignSuper({
			className: 'widget-success',
			width: 'auto',
			height: 'auto',
			maxWidth: 300,
			opacity: 0,
			timeout: 3000
		}, config), null, <div className="ch-text fn-wrap"><i className="ch-logo">√</i>{info||'操作成功'}</div>);
	}
	static error(info, config){
		return new originWidget( limit.assignSuper({
			className: 'widget-error',
			width: 'auto',
			height: 'auto',
			maxWidth: 300,
			opacity: 0,
			timeout: 3000
		}, config), null, <div className="ch-text fn-wrap"><span className="ch-logo">×</span>{info||'操作失败'}</div>);
	}
};

module.exports = originWidget;