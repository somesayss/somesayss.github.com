
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		calendarFocus: false,
		value: undefined
	}
	static defaultProps = {
		actionId: 'CalendarInput',
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
	onSelect(val){
		let me = this;
		let {state, props} = me;
		state.value = val;
		return me.updateComponent().then(() => {
			return props.onChange(val);
		});
	}
};

module.exports = Controller;
