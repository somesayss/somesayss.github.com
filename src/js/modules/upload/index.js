"use strict";

// 依赖
import DomUtil from 'common/domUtil';
import ParseForm from 'modules/parseForm/index';

class Upload extends ParseForm {
	props = {
		url: '/common/upload.json'
		,onprogress: limit.K
		,errParseEle: '上传失败，未解析到element。'
		,errSys: '上传失败，系统错误。'
	}
	constructor(config){
		super(...arguments);
		let me = this;
		limit.assign(me.state, me.props, config);
	}
	submit(){
		let me = this;
		if( window.FormData && window.XMLHttpRequest ){
			return me.ajaxSubmit();
		}else{
			return me.iframeSubmit();
		};
	}
	ajaxSubmit(){
		let me = this;
		return new Promise((resolve, reject) => {
			if( !me.element ){
				return reject(me.state.errParseEle);
			};
			let state = me.state;
			let AJAX = new XMLHttpRequest();
			AJAX.open('POST', state.url);
			// 上传进度
			AJAX.upload.onprogress = function(e){
				let {loaded, total} = e;
				if( total ){
					state.onprogress( limit(loaded/total).toFixed(2).toNumber().val(), loaded, total );
				};
			};
			// 结束
			AJAX.onload = function(e){
				me.parseRespone(e.target.responseText, resolve, reject);
			};
			// 错误
			AJAX.onerror = reject;
			AJAX.send( me.useFormData() );
		});
	}
	iframeSubmit(){
		let me = this;
		return new Promise((resolve, reject) => {
			let {state} = me;
			let element = me.element;
			if( !element ){
				return reject(me.state.errParseEle);
			};
			let iframe = document.createElement('iframe');
			element.target = iframe.name = `upload${limit.getUid()}`;
			element.action = state.url;
			iframe.style.display = 'none';
			document.body.appendChild(iframe);
			$(iframe).on('load', () => {
				$(iframe).off('load');
				let iframeBody = iframe.contentWindow.document.body;
				let responseText = iframeBody.innerHTML.replace(/<.*?>/g, '');
				me.parseRespone(responseText, resolve, reject);
				me.removeHideArea(iframe);
				element.target = '';
			});
			element.submit();
		});
	}
	parseRespone(responseText, resolve, reject){
		let me = this;
		let errMeg = me.state.errSys;
		if( responseText ){
			try{
				let response = JSON.parse(responseText);
				if( limit.getValueInObject(response, 'hasError') === false ){
					if( limit.getValueInObject(response, 'content', 'isSuccess') ){
						resolve(response.content);
					}else{
						reject( limit.getValueInObject(response, 'content', 'msg') || errMeg );
					};
				}else{
					reject( limit.getValueInObject(response, 'msg') || errMeg );
				};
			}catch(e){
				reject(e);
			};
		}else{
			reject(errMeg);
		};
	}
	removeHideArea(element){
		DomUtil.clearDom(element);
	}
}

module.exports = Upload;







