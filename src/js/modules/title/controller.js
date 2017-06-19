"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		
	}
	static defaultProps = {
		actionId: 'limit_title',
		shouldComponentNotUpdate: true,
		diffX: 10,
		diffY: 10
	}
};

module.exports = Controller;