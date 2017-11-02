
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		focus: false,
		focusNumber: 0
	}
	static defaultProps = {
		actionId: 'Select',
		width: 300,
		height: 30,
		scrollSize: 4,
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K
	}
	constructor(props){
		let me = super();
		let {state} = me;
		state.list = me.parseListByChildren(props);
		me.setInitFocusNmuber();
	}
	setInitFocusNmuber(){
		let me = this;
		let {state} = me;
		state.focusNumber = 0;
		state.list.some((val, key) => {
			if( val.selected ){
				state.focusNumber = key;
				return true;
			};
		});
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
		let {state} = me;
		state.list = me.parseListByChildren(nextState);
		me.setInitFocusNmuber();
	}
	onFocus(flag){
		let me = this;
		let {state} = me;
		state.focus = flag;
		return me.updateComponent().then(() => {
			if( flag ){
				me.props.onFocus();
			}else{
				me.props.onBlur();
			};
		});
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
	doSelect(val, key){
		let me = this;
		let {state, props} = me;
		let {focusNumber, list} = state;
		let targetKey = 0;
		list.forEach((v, k) => {
			if( v.selected ){
				targetKey = k; 
			};
			v.selected = false;
		});
		val.selected = true;
		if( limit.isDefined(key) ){
			targetKey = state.focusNumber = key;
		};
		return me.updateComponent().then(() => {
			if( targetKey !== focusNumber ){
				props.onChange(val.value, val.key, focusNumber);
			};
		});
	}
	onSelect(val, key){
		let me = this;
		return me.doSelect(val, key);
	}
	onEnterDown(){
		let me = this;
		let {state: {list, focusNumber}, props} = me;
		let val = list[focusNumber];
		if( val ){
			return me.doSelect(val);
		};
	}
};

module.exports = Controller;
