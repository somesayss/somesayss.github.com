
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		indeterminate: false,
		checked: false
	}
	onSetIndeterminate(){
		let me = this;
		let {state} = me;
		state.indeterminate = !state.indeterminate;
		return me.updateComponent();
	}
	onSetChecked(){
		let me = this;
		let {state} = me;
		state.checked = !state.checked;
		return me.updateComponent();
	}
	onClick(){
		let me = this;
		let {state} = me;
		state.indeterminate = true;
		return me.updateComponent();
	}
	onChangeRadio(e){
		console.log(e.target.value);
	}
	onChangeCheck(val, e){
		console.log(val, e.target);
	}
};

export default Controller;
