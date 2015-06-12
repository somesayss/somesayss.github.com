"use strict";
/**
 * 业务：全局[global]
 * 2015,05,19 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var $ = require('$'),
		constant = require('common/constant'),
		util = require('common/util'),
		dialog = require('common/dialog'),
		delegate = require('common/delegate'),
		PlaceHolder = require('model/placeHolder/main');
	//变量
	var WIN = window;
 
	//组件：占位符
	$('[placeholder]').each(function(){
		new PlaceHolder( { element:this, shadowTextCss: {left:'10px',top:'1px'} } );
	});

	//事件：导航查询支持'enter'
	delegate.on('keypress', '.JS-trigger-keypress-search', function(e){
		if(e.charCode === 13){
			util.redirect(constant.getUrl('suitCaseSearch'));
		}
	});
	//事件：查询
	delegate.on('click', '.JS-trigger-clcik-search', function(){
		util.redirect(constant.getUrl('suitCaseSearch'));
	});
	//事件：收藏
	delegate.on('click', '.JS-trigger-click-favorite', function(){
		if (document.all){    
	        try{    
	            window.external.addFavorite(window.location.href, document.title);    
	        }catch(e){    
	            alert( "加入收藏失败，请使用Ctrl+D进行添加" );    
	        }    
	    }else if (window.sidebar){    
	        window.sidebar.addPanel(document.title, window.location.href, "");    
	     }else{    
	        alert( "加入收藏失败，请使用Ctrl+D进行添加" );    
	    }
	});
	//事件：登陆
	delegate.on('click', '.JS-trigger-click-login', function(){
		WIN.dialogIframe = dialog.iframe('/lassen/login.htm', {width: 380, height:380});
	});

});