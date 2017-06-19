"use strict";

// 依赖
const limit = require('limit');
const originClass = require('./index');
const Widget = require('common/myReflux/widget');

class originWidget extends Widget {
	static originClass = originClass
};

module.exports = originWidget;