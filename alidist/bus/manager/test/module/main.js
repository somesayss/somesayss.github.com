"use strict";
/**
 * 业务
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var Paginator = require('model/paginator/main'),
		SearchList = require('model/searchList/main');

	//组件:分页
	var a = new Paginator({element: '#paginator'});

	//组件:查询列表
	var b = new SearchList({element: '#searchList'});

});