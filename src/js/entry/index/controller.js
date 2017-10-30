
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		com: null
	}
	onChangeCom(reactCom){
		let me = this;
		let {state} = me;
		state.com = reactCom;
		return me.updateComponent();
	}
};

export default Controller;
