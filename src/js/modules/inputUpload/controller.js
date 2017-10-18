
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		isUpload: false
	}
	static defaultProps = {
		actionId: 'InputUpload',
		value: '上 传',
		width: 300,
		param: {},
		action: '/common/upload.json',
		multiple: false,	// IE8不支持
		accept: '',			// IE8不支持
		onChange: limit.K,
		onProgress: limit.K,	// IE8不支持
		onUploadSuccess: limit.K,
		onUploadError: limit.K
	}
	onChange(nameList){
		let me = this;
		let {state, props} = me;
		state.isUpload = true;
		console.log(nameList);
		return me.updateComponent().then(() => {
			return props.onChange(nameList);
		});
	}
	onProgress(scale){
		let me = this;
		let {props} = me;
		return props.onProgress(scale);
	}
	onUploadSuccess(...args){
		console.log('onUploadSuccess');
		let me = this;
		let {state, props} = me;
		state.isUpload = false;
		return me.updateComponent().then(() => {
			return props.onUploadSuccess(...args);
		});
	}
	onUploadError(e){
		console.log('onUploadError', e);
		let me = this;
		let {state, props} = me;
		state.isUpload = false;
		return me.updateComponent().then(() => {
			return props.onUploadError(e);
		});
	}
};

export default Controller;
