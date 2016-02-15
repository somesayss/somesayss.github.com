"use strict";
/**
 * 2015.02.28
 * dom工具类
 * version: 1.0.0
 */
define(function(require, exports) {

	//变量
	var limitDom = {},
		WIN = window,
		DOC = WIN.document;

	// chrom浏览器
	limitDom.isChrome = !!WIN.chrome;

	return limitDom;

});