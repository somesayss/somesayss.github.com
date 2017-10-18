
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		calendarFocus: false,
		value: [null, null]
	}
	static defaultProps = {
		actionId: 'CalendarRange',
		onChange: limit.K,
		onFocus: limit.K,
		onBlur: limit.K
	}
	onFocus(key){
		let me = this;
		let {state, props} = me;
		state.calendarFocus = key;
		return me.updateComponent().then(() => {
			if( key ){
				return props.onFocus();
			}else{
				return props.onBlur();
			};
		});
	}
	onSelectLe(val){
		let me = this;
		let {state, props} = me;
		state.value[0] = val;
		return me.updateComponent().then(() => {
			return props.onChange(state.value);
		});
	}
	onSelectRi(val){
		let me = this;
		let {state, props} = me;
		state.value[1] = val;
		return me.updateComponent().then(() => {
			return props.onChange(state.value);
		});
	}
};

module.exports = Controller;
