"use strict";

// 依赖
class ParseForm {
	props = {
		element: null	// 主要表单
	}
	state = {}
	element = null
	constructor(config){
		let me = this;
		let state = me.state;
		limit.assign(state, me.props, config);
		if( me.isFormElement() ){
			me.element = state.element;
		};
	}
	isFormElement(){
		let me = this;
		let state = me.state;
		let element = state.element;
		return element && element.nodeName === 'FORM';
	}
	useFormData(){
		let me = this;
		let element = me.element;
		if( element && window.FormData ){
			return new FormData(element);
		};
	}
}

export default ParseForm;
