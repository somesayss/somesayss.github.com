"use strict";

// 依赖
const Widget = require('common/myReflux/widget');
const originClass = require('common/myReflux/hoc')( require('./view'), require('./controller') );

class originWidget extends Widget {
	constructor(config){
		let me = super(config, originClass);
	}
};

originClass.widget = originWidget;
module.exports = originClass;