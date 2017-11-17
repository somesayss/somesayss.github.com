
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		checked: false,
		indeterminate: false,
		disabled: false
	}
	static defaultProps = {
		actionId: 'Checkbox',
		onChange: limit.K,
		defaultChecked: false,
		value: '',
		name: ''
	}
	constructor(props){
		let me = super();
		if( props.defaultChecked ){
			me.state.checked = true;
		};
	}
	onChange(e){
		let me = this;
		let {state, props} = me;
		let {checked} = state;
		state.checked = !checked;
		state.indeterminate = false;
		if( !state.isClick ){
			state.isClick = true;
		};
		return me.updateComponent().then(() => {
			setTimeout(() => {
				me.state.isClick = false;
				me.updateComponent();
			}, 300);
			return props.onChange(e, props.value, checked);
		});
	}
	onResetChecked(){
		let me = this;
		let {state, props} = me;
		state.checked = false;
		if( props.defaultChecked ){
			me.state.checked = true;
		};
		return me.updateComponent();
	}
};

export default Controller;
