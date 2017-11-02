
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		list: [],
		uploadId: ''
	}
	static defaultProps = {
		actionId: 'InputUpload',
		value: '上 传',
		width: 300,
		param: {},
		size: 10,
		fileSize: 1, // 20 * 1024 * 1024
		rule: ''
	}
	onChange(nameList){
		let me = this;
		let {state} = me;
		let uploadId = state.uploadId = limit.getTimeUid();
		Array.prototype.push.apply(state.list, nameList.map((name) => {
			return {
				name,
				uploadId,
				progress: 0
			};
		}));
		return me.updateComponent();
	}
	onProgress(scale){
		let me = this;
		let {state: {list, uploadId}} = me;
		list.forEach((val) => {
			if( val.uploadId === uploadId ){
				val.progress = scale;
			};
		});
		return me.updateComponent();
	}
	onUploadSuccess(){
		let me = this;
		let {state} = me;
		state.uploadId = '';
		return me.updateComponent();
	}
	onUploadError(a){
		let me = this;
		let {state} = me;
		let {uploadId} = state;
		state.list = state.list.filter((val) => {
			return val.uploadId !== uploadId;
		});
		state.uploadId = '';
		return me.updateComponent();
	}
};

export default Controller;
