"use strict";
/**
 * 常量 使用闭包来确认常量无法被修改 只暴露出get方法
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	var url = {
		//网站首页
		'domainIndex': '/lassen/domain/index.htm',
		//案件查询
		'suitCaseSearch': '/lassen/suit/caseSearch.htm'
	}
	//获取URL
	exports.getUrl = function(key){
		return url[key];
	}


});