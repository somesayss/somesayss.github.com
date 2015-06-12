"use strict";
/**
 * 业务：我的诉讼[suit/myCase]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//默认依赖一个全局都引用的业务模块
	require('bus/global/main');

	//依赖
	var $ = require('$'),
		util = require('common/util'),
		FilterConditions = require('model/filterConditions/main'),
		CountDown = require('model/countDown/main');

	//组件
	new FilterConditions({element: '#filter-conditions'});

	$('.JS-target-count-down').each(function(){
		var node = $(this),
			endTime = node.data('endTime'),
			countDownExp = new CountDown({
				target: endTime
			}),
			intervalID;
		//定时器
		intervalID = setInterval(function(){
			var data = countDownExp.use();
			//不存在 干掉定时器
			if(!data){
				return clearInterval(intervalID)
			}
			node.html(data.hour + ' 时 ' + data.minute + ' 分 ' + data.second + ' 秒 ');
		}, 1000);
	});

});