	
// 依赖
import Ajax from 'modules/ajax/index';
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		page: 1,
		number: 10,
		totle: 0
	}
	static defaultProps = {
		actionId: 'searchList',
		url: '',
		showQuickJumper: true,
		showSizeChanger: true,
		searchParam: [],
		onSuccess: limit.K,
		onError: limit.K
	}
	onShowSizeChange(current, pageSize){
		let me = this;
		let {state} = me;
		state.number = pageSize;
		state.page = current;
		return me.updateComponent();
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
		return me.updateComponent().then(() => {
			return me.onSearch();
		});
	}
	onSearch(){
		let me = this;
		let {state, props} = me;
		if( props.url ){
			return new Ajax({
				url: props.url,
				data: {page: me.getPage(), searchParam: limit.assign.apply(null, [].concat(props.searchParam))}
			}).then((res) => {
				let {count, list, successMsg} = res;
				me.state.totle = Math.ceil(count/state.number);
				return me.updateComponent().then(() => {
					return props.onSuccess({list, successMsg});
				});
			}, props.onError);
		};
	}
	getPage(){
		let me = this;
		let {state: {page, number}} = me;
		return [(page - 1) * number, number];
	}
};

export default Controller;



























