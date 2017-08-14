
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		value: ''
	}
	onChange(val){
		let me = this;
		me.state.value = val;
		return me.updateComponent();
	}
};

module.exports = Controller;
