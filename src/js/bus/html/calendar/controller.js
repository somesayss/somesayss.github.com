
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		time: '2017-08-01'
	}
	onChange(){
		let me = this;
		let {state} = me;
		state.time = '2017-10-01';
		return me.updateComponent();
	}
};

module.exports = Controller;
