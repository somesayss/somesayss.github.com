
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		show: true,
		theValue: 'abc'
	}
	onShow(){
		let me = this;
		let {state} = me;
		state.show = !state.show;
		return me.updateComponent();
	}
	onChangeValue(){
		let me = this;
		let {state} = me;
		state.theValue = '';
		return me.updateComponent();
	}
};

export default Controller;
