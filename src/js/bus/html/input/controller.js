
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		value: '',
		a: 'a1'
	}
	onChange(val){
		let me = this;
		me.state.value = val;
		return me.updateComponent();
	}
	onClick(){
		let me = this;
		me.state.a = 'a2';
		return me.updateComponent();
	}
};

export default Controller;

