
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		multipleFocus: false,
		value: '',
		list: [],
		originList: [],
		focusNumber: -1
	}
	static defaultProps = {
		actionId: 'Multiple',
		scrollSize: 4,
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K,
		defaultValue: '',
		width: 300,
		height: 30,
		readOnly: true
	}
	constructor(props){
		let me = super();
		let {state} = me;
		state.list = state.originList = me.parseListByChildren(props, 'init');
		me.setInitFocusNmuber();
	}
	setInitFocusNmuber(){
		let me = this;
		let {state} = me;
		state.focusNumber = 0;
		state.originList.some((val, key) => {
			if( val.selected ){
				state.focusNumber = key;
				return true;
			};
		});
	}
	parseListByChildren(props, flag){
		let me = this;
		let {state} = me;
		let propsValue;
		if( flag === 'init' ){
			propsValue = limit.isArray(props.defaultValue) ? props.defaultValue : props.defaultValue.split(',');
		}else{
			propsValue = limit.isArray(props.value) ? props.value : props.value.split(',');
		};
		return React.Children.map(props.children, (child, key) => {
			let val = child.props;
			let valValue = val.value;
			let selected = valValue && limit.contains(propsValue, valValue);
			return {key: val.children, value: valValue, selected: selected};
		});
	}
	componentWillUpdate(nextState){
		let me = this;
		let {state} = me;
		state.list = state.originList = me.parseListByChildren(nextState, 'update');
	}
	onFocus(key){
		let me = this;
		let {state, props} = me;
		if( key ){
			state.value = '';
			state.list = state.originList;
		}else{
			state.focusNumber = -1;
		};
		state.multipleFocus = key;
		return me.updateComponent().then(() => {
			if( key ){
				return props.onFocus();
			}else{
				return props.onBlur();
			};
		});
	}
	onSelect(val){
		let me = this;
		val.selected = !val.selected;
		return me.updateComponent().then(me.doSelect.bind(me));
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
	doSelect(){
		let me = this;
		let {state, props} = me;
		let list = state.originList.filter((val) => val.selected).map((val) => {return {key: val.key, value: val.value}});
		return props.onChange(list.map(val => val.value).join(','), list);
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
	onEnterDown(){
		let me = this;
		let {state: {list, focusNumber}, props} = me;
		let val = list[focusNumber];
		if( val ){
			val.selected = !val.selected;
			return me.updateComponent().then(me.doSelect.bind(me));
		};
	}
};

module.exports = Controller;























