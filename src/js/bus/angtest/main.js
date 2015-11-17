"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Widget = require('widget');

	new Widget({element: '#eee'});

	console.log(Widget.query(window.opener.aaa));


});