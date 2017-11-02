"use strict";
	
// 依赖
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		originData: {
			name: '',
			age: '',
			pwd: '',
			content: '',
			number: '',
			time: '',
			timeRange: '',
			duoxuan: ''
		},
		isHideAge: false
	}
	onHideAge(){
		let me = this;
		me.state.isHideAge = !me.state.isHideAge;
		me.updateComponent();
	}
	onSuccess(){
		let me = this;
	}
	onChange(name, val, e){
		let me = this;
		let originData = me.state.originData;
		// if( val.target ){
			// originData[name] = val.target.value;
		// }else{
			originData[name] = val;
		// };
		return me.updateComponent();
	}
};

export default Controller;

