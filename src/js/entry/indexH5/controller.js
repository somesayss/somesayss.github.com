
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		comList: []
	}
	onChangeCom(reactCom){
		let me = this;
		let {state: {comList}} = me;
	// 	let value = {
	// 		isShow: false,
	// 		reactCom
	// 	};
	// 	state.comList.forEach((val) => {
	// 		console.log(val.reactCom === reactCom);
	// 	});
	// 	state.comList.push(value);

	// 	return me.updateComponent().then(() => {
	// 		setTimeout(() => {
	// 			value.isShow = true;
	// 			return me.updateComponent();
	// 		}, 100);
			
	// 	});
		let isAdd = !comList.length || !comList.some(v => v.reactCom === reactCom);
		if( isAdd ){
			return me.onAddCom(reactCom);
		}else{
			limit(comList).reverse().some((val) => {
				if( val.reactCom === reactCom ){
					return true;
				}else{
					val.isShow = false;
				};
			});
			return me.updateComponent().then(() => {
				setTimeout(me.onDelCom.bind(me, reactCom), 300);
			});
		};
		
	}
	onAddCom(reactCom){
		let me = this;
		let {state: {comList}} = me;
		let value = { isShow: false, reactCom };
		comList.push(value);
		return me.updateComponent().then(() => {
			setTimeout(() => {
				value.isShow = true;
				return me.updateComponent();
			}, 100);
		});
	}
	onDelCom(reactCom){
		let me = this;
		let {state: {comList}} = me;
		let lastCom = limit.last(comList);
		if( lastCom ){
			if( lastCom.reactCom !== reactCom ){
				comList.pop();
				return me.onDelCom(reactCom);
			}else{
				return me.updateComponent();
			};
		};
		
	}
};

export default Controller;
