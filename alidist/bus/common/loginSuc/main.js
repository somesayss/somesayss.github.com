"use strict";
/**
 * 业务：首页[domain/index]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var $ = require('$'),
        util = require('common/util'),
        constant = require('common/constant');

    //变量
    var loginMsg = $('#login-msg'),
        userType = $('#userType'),
        userName = $('#userName'),
        WIN = window.top;

    //函数：回写信息
    function reWriteIntro(){
        WIN.jQuery('#login-success').html(userType.val() + ',' + userName.val());
    }
	//函数：登陆成功后的跳转
    function successLogin(){
        //在iframe内
        if(self !== top){
            loginMsg.html('3秒后自动消失。');
            reWriteIntro();
            setTimeout(function(){
                WIN.dialogIframe && WIN.dialogIframe.hide();
                delete WIN.dialogIframe;
            }, 3000);
        }else{
            loginMsg.html('3秒后自动跳转。');
            setTimeout(function(){
                util.redirect(constant.getUrl('domainIndex'));
            }, 3000);
        }
    }
    successLogin();

});