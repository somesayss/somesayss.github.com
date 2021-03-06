"use strict";
	
// 依赖
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		// 当前在第几页
		page: 1
	}
	static defaultProps = {
		// 总页数
		totle: 100,
		// 偏差值
		diff: 2,
		// 抛出接口
		onChange: limit.K,
		actionId: 'page'
	}
	static propTypes = {
		onChangePage: React.PropTypes.func
	}
	onChange(page){
		let me = this;
		let {state, props} = me;
		state.page = page;
		me.updateComponent().then(props.onChange.bind(me, page));
	}
};

export default Controller;
