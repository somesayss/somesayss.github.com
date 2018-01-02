
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		isShots: false,
		width: 400,
		height: 300
	}
	onScreenshots(is){
		let me = this;
		let {state} = me;
		state.isShots = is;
		return me.updateComponent();
	}
};

export default Controller;
