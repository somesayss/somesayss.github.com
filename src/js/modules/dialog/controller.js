"use strict";
	
// 依赖
const limit = require('limit');
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		top:0,
		marginLeft:0
	}
	static defaultProps = {
		width: 400,
		height: 200,
		actionId: 'dialog',
		onClose: limit.K,
		hasCover: true,
		hide: false
	}
};

module.exports = Controller;