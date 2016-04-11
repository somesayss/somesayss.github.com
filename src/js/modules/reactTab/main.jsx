"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {
	
	// 依赖
	const [Controller, View, HOC] = [require('./controller'), require('./view'), require('common/hoc')]; 

	return HOC(View, Controller);

});