"use strict";
	
// 依赖
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
		showList: false
	}
	static defaultProps = {
		actionId: 'limitSelect',
		width: 300,
		barHeight: 50,
		titleSize: 23,
		size: 4,
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K
	}
	constructor(props){
		let me = super();
		me.state.list = me.parseListByChildren(props);
	}
	parseListByChildren(props){
		return React.Children.map(props.children, (child) => {
			let val = child.props;
			let propsValue = props.value;
			let valValue = val.value;
			if( limit.isUndefined(propsValue) ){
				propsValue = '';
			};
			if( limit.isUndefined(valValue) ){
				valValue = '';
			};
			return {key: val.children, value: valValue, selected: valValue === propsValue};
		});
	}
	componentWillUpdate(nextState){
		let me = this;
		nextState.list = me.parseListByChildren(nextState);
	}
	onShowList(e){
		let me = this;
		let {state, props} = me;
		state.showList = !state.showList;
		me.updateComponent().then(() => {
			if( state.showList ){
				props.onFocus();
			}else{
				props.onBlur();
			};
		});
	}
	onSelect(val, key){
		let me = this;
		let {props, state} = me;
		let targetKey = null;
		state.list.forEach((val, key) => {
			if( targetKey == null && val.selected ){
				targetKey = key;
			};
			val.selected = false;
		});
		val.selected = true;
		if( targetKey !== null && targetKey !== key ){
			props.onChange(val.value, val.key, key);
		};
		me.updateComponent();
	}
};

module.exports = Controller;








