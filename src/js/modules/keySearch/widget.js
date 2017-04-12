"use strict";

// 依赖
const Widget = require('common/myReflux/widget');
const originClass = require('./index');

class originWidget extends Widget {
	static originClass = originClass
};

module.exports = originWidget;