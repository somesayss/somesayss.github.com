"use strict";
	
// 依赖
import Control from 'common/myReflux/control';
import Ajax from 'modules/ajax/index';

class Controller extends Control {
	state = {
		page: 1,
		number: 5,
		totle: 0
	}
	static defaultProps = {
		actionId: 'searchList',
		url: '',
		onSuccess: limit.K,
		onError: limit.K
	}
	// 上一页
	onPrev(){
		let me = this;
		let {state} = me;
		let {page} = state;
		page--;
		if( page < 1 ){
			page = 1;
		};
		return me.onChange(page);
	}
	// 下一页
	onNext(){
		let me = this;
		let {state} = me;
		let {page, totle} = state;
		page++;
		if( page > totle ){
			page = totle;
		};
		if( page === 0 ){
			page = 1;
		};
		return me.onChange(page);
	}
	// 回首页
	onStart(){
		let me = this;
		return me.onChange(1);
	}
	// 回末页
	onEnd(){
		let me = this;
		return me.onChange(me.state.totle);
	}
	// 总页数减一且刷新
	onTotleMinus(){
		let me = this;
		me.state.totle--;
		return me.onEnd();
	}
	onChange(val){
		let me = this;
		let {state, page} = me;
		state.page = val;
		me.updateComponent().then(() => {
			return me.onSearch();
		});
	}
	onSearch(){
		let me = this;
		let {state, props} = me;
		if( props.url ){
			return new Ajax({
				url: props.url,
				dataName: 'data',
				data: {page: me.getPage()}
			}).then((res) => {
				if( res.isSuccess ){
					me.state.totle = Math.ceil(res.val.count/state.number);
					return me.updateComponent().then(() => {
						return props.onSuccess(res.val, res.msg);
					});
				}else{
					return props.onError(res.msg);
				};
			}, props.onError);
		};
	}
	getPage(){
		let me = this;
		let {state} = me;
		let {number} = state;
		let page = {};
		page.start = (state.page - 1) * number;
		page.number = number;
		return page;
	}
};

module.exports = Controller;


























