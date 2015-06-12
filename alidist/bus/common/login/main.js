"use strict";
/**
 * 业务：首页[domain/index]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var $ = require('$'),
		Validator = require('common/validator');

	//组件：验证
	var validatorExp = new Validator({
        element: '#login-form',
        failSilently: true
    });
    validatorExp.addItem({
        element: '#loginName',
        required: true
    })
    .addItem({
        element: '#userPass',
        required: true
    })


});