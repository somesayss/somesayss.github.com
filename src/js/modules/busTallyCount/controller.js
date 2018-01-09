
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		countDataList: []
	}
	static defaultProps = {
		actionId: 'BusTallyCount'
	}
	onSelectType(data, nodeVal, e, val, checked){
		let me = this;
		data.checked = !checked;
		return me.updateComponent();
	}
	onSelectAllType(key, nodeVal, e, val, checked){
		let me = this;
		let {state: {countDataList}} = me;
		checked = !checked;
		countDataList.forEach((val) => {
			if( key === 'surplus' ){
				if( val.much >= 0 ){
					val.checked = checked;
				};
			}else{
				if( val.much < 0 ){
					val.checked = checked;
				};
			};
		});
		return me.updateComponent();
	}
};

module.exports = Controller;
