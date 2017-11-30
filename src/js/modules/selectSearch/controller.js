
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		selectSearchFocus: false,
		focusNumber: -1,
		value: '',
		list: [],
		originList: []
	}
	static defaultProps = {
		actionId: 'SelectSearch',
		scrollSize: 4,
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K,
		width: 300,
		notFound: '未找到匹配项'
	}
	constructor(props){
		let me = super();
		let {state} = me;
		state.list = state.originList = props.list;
	}
	onFocus(flag){
		let me = this;
		let {state, props} = me;
		state.selectSearchFocus = flag;
		// 失去焦点后重置focus
		if( !flag ){
			state.focusNumber = -1;
			state.value = '';
			state.list = state.originList;
		};
		return me.updateComponent().then(() => {
			if( flag ){
				return props.onFocus();
			}else{
				return props.onBlur();
			};
		});
	}
	onDeleteItem(){
		let me = this;
		let {state: {originList}} = me;
		limit.reverse(originList).some((val) => {
			if( val.selected ){
				val.selected = false;
				return true;
			};
		});
		return me.updateComponent();
	}
	onChange(val){
		let me = this;
		let {state} = me;
		state.list = state.originList.filter((v) => {
			return limit.includes(v.key, val)
		});
		state.value = val;
		state.focusNumber = -1;
		return me.updateComponent();
	}
	onKeyDown(key){
		let me = this;
		let {state} = me;
		let {list} = state;
		let max = list.length - 1;
		switch(key){
			case 'up':
				if( state.focusNumber > max || state.focusNumber <= 0 ){
					state.focusNumber = max; 
				}else{
					state.focusNumber--; 
				};
				break;
			case 'down':
				if( state.focusNumber < 0 || state.focusNumber >= max ){
					state.focusNumber = 0;
				}else{
					state.focusNumber++; 
				};
				break;
		};
		if( state.focusNumber <= 0 ){
			state.focusNumber = 0;
		}else if( state.focusNumber >= max){
			state.focusNumber = max;
		};
		return me.updateComponent();
	}
	onMouseEnter(key){
		let me = this;
		let {state} = me;
		state.focusNumber = key;
		return me.updateComponent();
	}
	doSelect(){
		let me = this;
		let {state, props} = me;
		state.value = '';
		state.list = state.originList;
		let list = state.originList.filter((val) => val.selected).map((val) => {return {key: val.key, value: val.value}});
		return me.updateComponent().then(() => {
			return props.onChange(list);
		});
	}
	onEnterDown(){
		let me = this;
		let {state: {list, focusNumber}, props} = me;
		let val = list[focusNumber];
		if( val ){
			val.selected = !val.selected;
			return me.updateComponent().then(me.doSelect.bind(me));
		};
	}
	onSelect(val){
		let me = this;
		let {state} = me;
		val.selected = !val.selected;
		return me.updateComponent().then(me.doSelect.bind(me));
	}

};

export default Controller;
