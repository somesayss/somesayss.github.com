
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		value: ''
	}
	static defaultProps = {
		actionId: 'InputText',
		onChange: limit.K
	}
	onChange(val, compositionstart){
		let me = this;
		me.state.value = val;
		return me.updateComponent().then(() => {
			if( !compositionstart ){
				me.props.onChange(val);
			};
		});
	}
};

module.exports = Controller;
