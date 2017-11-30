
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		value: ''
	}
	static defaultProps = {
		actionId: 'InputText',
		onOriginChange: limit.K,
		onChange: limit.K
	}
	onChange(val, compositionstart){
		let me = this;
		me.state.value = val;
		return me.updateComponent().then(() => {
			me.props.onOriginChange(val);
			if( !compositionstart ){
				me.props.onChange(val);
			};
		});
	}
};

export default Controller;

