
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		checked: false,
		disabled: false
	}
	static defaultProps = {
		actionId: 'Radio',
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
	onResetChecked(){
		let me = this;
		let {state, props} = me;
		state.checked = false;
		if( props.defaultChecked ){
			me.state.checked = true;
		};
		return me.updateComponent();
	}
	onChange(e){
		let me = this;
		let {state, props} = me;
		let isTriggerChange = !state.checked;
		state.checked = true;
		if( !state.isClick ){
			state.isClick = true;
		};
		return me.updateComponent().then(() => {
			setTimeout(() => {
				me.state.isClick = false;
				me.updateComponent();
			}, 300);
			if( isTriggerChange ){
				let {props: {name}} = me;
				let {target} = e;
				return Actions('Radio').clearChecked(name, target);
			};
		}).then(() => {
			return isTriggerChange && props.onChange(e, props.value);
		});
	}
	onClearChecked(name, input){
		let me = this;
		let {state, props} = me;
		if( name && me.isInTheSameForm(input) ){
			state.checked = false;
			return me.updateComponent();
		};
	}
	isInTheSameForm(originInput){
		let me = this;
		let {com: {refs: {com: {refs: {input}}}}} = me;
		return originInput !== input && originInput.form === input.form;
	}
};

export default Controller;
