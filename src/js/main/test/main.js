"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Base = require('base'),
		config = require('github/main/test/config');

	var person = new Base(config);

	console.log(person.get('kiss'));

});