"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Base = require('base'),
		config = require('github/bus/test/config');

	var person = new Base(config);

	return function(){
		console.log(person.get('kiss'));
	};
	

});