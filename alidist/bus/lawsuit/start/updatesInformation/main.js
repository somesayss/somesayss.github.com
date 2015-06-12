"use strict";
/**
 * 业务：首页[domain/index]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//默认依赖一个全局都引用的业务模块
	require('bus/global/main');

	//依赖
	var $ = require('$'),
		delegate = require('common/delegate'),
		util = require('common/util'),
		Validator = require('common/validator');
	
	//组件：验证
	var validatorExp = new Validator({
        element: '#updatesInformation-form',
        failSilently: true
    });
    validatorExp.addItem({
        element: '[name=username]',
        required: true
    })
    .addItem({
        element: '[name=idCard]',
        required: true,
        rule: 'cardid'
    })
    .addItem({
        element: '[name=currentAddress]',
        required: true
    })
    .addItem({
        element: '[name=receiveAddress]',
        required: true
    })
    .addItem({
        element: '[name=mobile]',
        required: true,
        rule: 'mobile'
    })
    .addItem({
        element: '[name=email]',
        required: true,
        rule: 'email'
    });

    //事件：下一步
    delegate.on('click', '.JS-trigger-click-next', function(e){
    	//事件：校验
    	validatorExp.execute(function(flag, element){
    		if(flag){
    			util.log('验证失败');
    			e.preventDefault();
    		}else{
    			util.log('验证成功');
    		}
    	});
    });
    


});