
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		width: null,
		height: null
	}
	static defaultProps = {
		actionId: 'AutoSizeInput',
		type: 'input',
		minWidth: 13,
		minHeight: 18,
		maxWidth: 300,
		maxHeight: 180
	}
	onChangeWidth(width){
		let me = this;
		let {state} = me;
		state.width = width;
		return me.updateComponent();
	}
	onChangeHeight(height){
		let me = this;
		let {state} = me;
		state.height = height;
		return me.updateComponent();
	}
};

export default Controller;
