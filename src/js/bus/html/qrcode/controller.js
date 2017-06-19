"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		originData: {
			name: ''
		}
	}
};

module.exports = Controller;