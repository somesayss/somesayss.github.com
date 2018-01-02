
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
	onChange(val, compositionstart, e){
		let me = this;
		let copyEvent = limit.assign({}, e);
		me.state.value = val;
		return me.updateComponent().then(() => {
			me.props.onOriginChange(val);
			if( !compositionstart ){
				me.props.onChange(val, copyEvent);
			};
		});
	}
};

export default Controller;

