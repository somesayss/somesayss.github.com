"use strict";

// 依赖
const limit = require('limit');
const originClass = require('./index');
const Input = require('modules/input/index');
const Widget = require('common/myReflux/widget');

class originWidget extends Widget {
	static originClass = originClass
	setCenter(){
		let me = this;
		Actions(me.componentExp).setCenter();
	}
	static loading(){
		return new originWidget({
			className: 'widget-loading',
			width: 200,
			height: 2,
			opacity: 0
		}, null, <i className="ch-load"></i>);
	}
	static success(info, config){
		return new originWidget(  limit.assignSuper({
			className: 'widget-success',
			width: 'auto',
			height: 'auto',
			maxWidth: 300,
			opacity: 0,
			timeout: 3000
		}, config), null, <div className="ch-text fn-wrap">
			<i className="ch-logo iconfont icon-success"></i>{info||'操作成功'}
		</div>);
	}
	static error(info, config){
		return new originWidget( limit.assignSuper({
			className: 'widget-error',
			width: 'auto',
			height: 'auto',
			maxWidth: 300,
			opacity: 0,
			timeout: 3000
		}, config), null, <div className="ch-text fn-wrap"><span className="ch-logo iconfont icon-wrong"></span>{info||'操作失败'}</div>);
	}
	static confirm(info, config){
		return new Promise((resolve, reject) => {
			let dialog = new originWidget( limit.assignSuper({
				className: 'widget-confirm',
				width: 'auto',
				height: 'auto',
				maxWidth: 300,
				opacity: .3,
				onClose(){
					reject('取消');
				},
				useEsc: true
			}, config), null,
				<div className="ch-layout">
					<div className="ch-head">提示</div>
					<div className="ch-body">{info}</div>
					<div className="ch-foot">
						<Input type="button" 
							value="确 定" 
							focus="focus"
							onClick={function(){ resolve('sure');dialog.destroy() }} />
						<Input type="button" value="取 消" onClick={function(){ reject('cancel');dialog.destroy() }} className="fn-ML10" />
					</div>
				</div>
			); 
		});
	}
	static alert(info, config){
		return new Promise((resolve, reject) => {
			let dialog = new originWidget( limit.assignSuper({
				className: 'widget-confirm',
				width: 'auto',
				height: 'auto',
				maxWidth: 300,
				opacity: .3,
				onClose(){
					reject('取消');
				},
				useEsc: true
			}, config), null,
				<div className="ch-layout">
					<div className="ch-head">提示</div>
					<div className="ch-body fn-wrap">{info}</div>
					<div className="ch-foot">
						<Input type="button"
							focus="focus"
							value="确 定" 
							onClick={function(){ resolve('sure');dialog.destroy() }} />
					</div>
				</div>
			); 
		});
	}
};

module.exports = originWidget;