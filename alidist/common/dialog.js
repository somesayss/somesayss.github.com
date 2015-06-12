"use strict";
/**
 * 审批中心详细页面
 * 邵红亮
 */
define(function(require, exports, module) {

	/*--依赖--*/
	var $ = require('$'),
		veUtilHandlerbars = {},
		Dialog = require('dialog');

	/*--变量--*/
	var dialog = {};

	/*--函数--*/
	function exoDialog(str, options){
		return new Dialog($.extend({
			content: str,
			closeTpl: '',
			classPrefix: 've-dialog-confirm',
			width: 280
		}, options)).after('hide', function(){
			this.destroy();
		}).show();
	}
	//计时器
	function timeout(guid, element, EXP, arr, callback){
		element.find('.JS-time-match').html(guid--);
		if(guid > 0){
			arr.timeoutID = setTimeout(function(){
				timeout(guid, element, EXP, arr, callback)
			}, 1000);
		}else{
			callback && callback();
			EXP.hide();
		}
	}

	/*--接口--*/
	//提醒
	dialog.confirm = function(title, intro, callback, error, options){
		var arr = [
			'<i class="ve-dialog-icon-confirm"></i><div class="ve-dialog-title-confirm"><strong>'+title+'</strong></div>',
			'<div class="ve-dialog-intro-confirm ve-margin-top-10">'+(intro||'')+'</div>',
			'<div class="ve-text-align-center ve-margin-top-15"><input type="button" data-role="sure" class="ve-input-button-org" value="确 定" /><input type="button" data-role="cancel" class="ve-input-button-gray ve-margin-left-10" value="取 消" /></div>'
		];
		return exoDialog(arr.join(''), $.extend({
			events:{
				'click [data-role=close],[data-role=cancel]': function(e){
					error && error.call(this);
					this.hide();
				},
				'click [data-role=sure]': function(){
					callback && callback.call(this);
					this.hide();
				}
			}
		}, options));
	}
	//失败
	dialog.error = function(title, intro, callback, options){
		var arr = [
			'<i class="ve-dialog-icon-error"></i><div class="ve-dialog-title-confirm"><strong>'+title+'</strong></div>',
			'<div class="ve-dialog-intro-confirm ve-margin-top-10">'+(intro||'')+'</div>',
			'<div class="ve-padding-left-40 ve-margin-top-15"><input type="button" data-role="sure" class="ve-input-button-org" value="知道了" /></div>'
		];
		return exoDialog(arr.join(''), $.extend({
			events:{
				'click [data-role=sure]': function(){
					callback && callback.call(this);
					this.hide();
				}
			}
		}, options));
	}
	//警告
	dialog.alert = function(title, intro, callback, options){
		var arr = [
			'<i class="ve-dialog-icon-alert"></i><div class="ve-dialog-title-confirm"><strong>'+title+'</strong></div>',
			'<div class="ve-dialog-intro-confirm ve-margin-top-10">'+(intro||'')+'</div>',
			'<div class="ve-padding-left-40 ve-margin-top-15"><input type="button" data-role="sure" class="ve-input-button-org" value="知道了" /></div>'
		];
		return exoDialog(arr.join(''), $.extend({
			events:{
				'click [data-role=sure]': function(){
					callback && callback.call(this);
					this.hide();
				}
			}
		}, options));
	}
	//成功
	dialog.success = function(title, intro, callback, options){
		var arr = [
			'<i class="ve-dialog-icon-success"></i><div class="ve-dialog-title-confirm"><strong>'+title+'</strong></div>',
			'<div class="ve-dialog-intro-confirm ve-margin-top-10">'+(intro||'')+'</div>'
		],
			dialogExp;
		if(callback){
			arr.push('<div class="ve-padding-left-40 ve-margin-top-15"><input type="button" data-role="sure" class="ve-input-button-org" value="知道了" /><span class="ve-color-999 ve-padding-left-15" ><span class="JS-time-match ve-color-ea5652">5</span>秒后自动消失</span></div>');
			dialogExp = exoDialog(arr.join(''), $.extend({
				events:{
					'click [data-role=sure]': function(){
						callback && callback.call(this);
						clearTimeout(arr.timeoutID);
						this.hide();
					}
				}
			}, options));
			timeout(5, dialogExp.element, dialogExp, arr, callback);
			return dialogExp;
		}else{
			dialogExp = exoDialog(arr.join(''), $.extend({width:''}, options));
			setTimeout(function(){
				dialogExp.hide();
			}, ~~callback || 3000);
		}
		
	}

	//显示
	var show = dialog.show = function(title, intro, options){
		var arr = [
			'<div class="ve-dialog-title-show"><strong>'+title+'</strong></div>',
			'<div class="ve-dialog-intro-show">'+intro+'</div>',
		];
		return new Dialog($.extend({
			content: $(arr.join('')),
			// closeTpl: '',
			classPrefix: 've-dialog-show',
			width: 410
		}, options)).after('hide', function(){
			this.destroy();
		}).after('render', function(a,b,c){
			if(options){
				var renderComplete = options.renderComplete;
				renderComplete && renderComplete.call(this, this.element);
			}
		}).show();
	}
	//显示模板
	dialog.tplShow = function(title, tpl, data, options){
		return show(title, veUtilHandlerbars.compile(''+$(tpl).html()||'')(data), options);
	}
	//显示iframe
	dialog.iframe = function(url, options){
		return new Dialog($.extend({
			content: url,
			classPrefix: 'login-iframe',
			// closeTpl: '×',
			width: 410
		}, options)).after('hide', function(){
			this.destroy();
		}).show();
	}

	/*--返回--*/
	return dialog;

});