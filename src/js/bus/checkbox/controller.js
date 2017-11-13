
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		indeterminate: false
	}
	onClick(){
		let me = this;
		let {state} = me;
		state.indeterminate = true;
		return me.updateComponent();
	}
};

export default Controller;
