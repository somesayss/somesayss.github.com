"use strict";
	
// 依赖
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		filterData: [],
		value: '',
		focusNumber: -1,
		isFocus: false
	}
	static defaultProps = {
		actionId: 'inputSelect',
		originData: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a41', 'a5', 'a6', 'a42', 'a5', 'a6', 'a43', 'a5', 'a6'],
		scrollSize: 12,
		onChange: limit.K
	}
	doFilter(value){
		let me = this;
		let {props: {originData}, state} = me;
		state.filterData = originData.filter((val) => {
			return val !== value && val.indexOf(value) !== -1;
		});
		state.value = value;
		state.focusNumber = -1;
		return me.updateComponent();
	}
	doSelect(val){
		let me = this;
		return me.props.onChange(val);
	}
	onChange(value){
		let me = this;
		return me.doFilter(value).then(me.doSelect.bind(me, value));
	}
	onKeyDown(key){
		let me = this;
		let {state, props: {originData}} = me;
		let max = state.filterData.length || originData.length;
		switch(key){
			case 'right':
				if( state.focusNumber >= max - 1 ){
					state.focusNumber = 0; 
				}else{
					state.focusNumber++; 
				};
				break;
			case 'left':
				if( state.focusNumber <= 0 ){
					state.focusNumber = max - 1; 
				}else{
					state.focusNumber--; 
				};
				break;
			case 'up':
				if( state.focusNumber === max || state.focusNumber === -1 ){
					state.focusNumber = max - 1; 
				}else{
					state.focusNumber -= 3; 
				};
				break;
			case 'down':
				if( state.focusNumber === -1 || state.focusNumber === max ){
					state.focusNumber = 0;
				}else{
					state.focusNumber += 3; 
				};
				break;
		};
		if( state.focusNumber <= -1 ){
			state.focusNumber = -1;
		}else if( state.focusNumber >= max){
			state.focusNumber = max;
		};
		return me.updateComponent();
	}
	onEnterDown(){
		let me = this;
		let {state} = me;
		let {filterData, focusNumber} = state;
		let val = state.value = filterData[focusNumber];
		return me.updateComponent().then(me.doSelect.bind(me, val));
	}
	onSelectItem(val, key){
		let me = this;
		let {state} = me;
		state.value = val;
		state.focusNumber = key;
		return me.updateComponent().then(me.doSelect.bind(me, val));
	}
	onFocus(val){
		let me = this;
		let {state, props} = me;
		state.isFocus = val;
		if( val ){
			me.doFilter(state.value);
		};
		return me.updateComponent();
	}
};

export default Controller;




























