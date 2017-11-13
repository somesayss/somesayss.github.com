
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		checked: false,
		indeterminate: false,
		disabled: false
	}
	static defaultProps = {
		actionId: 'Checkbox',
		onClick: limit.K,
		onChange: limit.K
	}
	onChange(e){
		let me = this;
		let {state, props} = me;
		state.checked = !state.checked;
		state.indeterminate = false;
		return me.updateComponent().then(() => {
			return props.onChange(e);
		});
	}
	onClick(){
		let me = this;
		let {state, props} = me;
		if( !state.isClick ){
			state.isClick = true;
		};
		return me.updateComponent().then(() => {
			setTimeout(() => {
				me.state.isClick = false;
				me.updateComponent();
			}, 300);
		}).then(() => {
			return props.onClick();
		});
	}
};

export default Controller;
