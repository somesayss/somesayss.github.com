"use strict";
/**
 * 模型
 */

define(function (require, exports, module) {

	// 依赖
	return require('common/myReflux/hoc')(require('./view'), require('./controller'));
});