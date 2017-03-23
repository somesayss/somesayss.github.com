"use strict";
	
// 依赖
const limit = require('limit');
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {}
	static defaultProps = {
		actionId: 'Cover',
		opacity: .3,
		background: '#FFF'
	}
};

module.exports = Controller;