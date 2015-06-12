"use strict";
/**
 * 验证类[全站的验证入口]
 * 2015,05,21 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var $ = require('$'),
		Validator = require('validator');

	//变量

	//函数：确定是否是身份证
	function isIdCard(cardid) {
	    //身份证正则表达式(18位) 
	    var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
	    var stard = "10X98765432"; //最后一位身份证的号码
	    var first = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //1-17系数
	    var sum = 0;
	    if (!isIdCard2.test(cardid)) {
	        return false;
	    }
	    var year = cardid.substr(6, 4);
	    var month = cardid.substr(10, 2);
	    var day = cardid.substr(12, 2);
	    var birthday = cardid.substr(6, 8);
	    if (birthday != dateToString(new Date(year + '/' + month + '/' + day))) { //校验日期是否合法
	        return false;
	    }
	    for (var i = 0; i < cardid.length - 1; i++) {
	        sum += cardid[i] * first[i];
	    }
	    var result = sum % 11;
	    var last = stard[result]; //计算出来的最后一位身份证号码

	    if (cardid[cardid.length - 1].toUpperCase() == last) {
	       return true;
	    } else {
	       return false;
	    }
	}
	//转义日期
	function dateToString(date) {
	    if (date instanceof Date) {
	        var year = date.getFullYear();
	        var month = date.getMonth() + 1;
	        month = month < 10 ? '0' + month: month;
	        var day = date.getDate();
	        day = day < 10 ? '0' + day: day;
	        return '' + year + month + day;
	    }
	    return '';
	}

	//自定义方法
	Validator.addRule('cardid', function(options) {
    	 return isIdCard(options.element.val());
	}, '亲，请填写正确的身份证号');

	return Validator;

});