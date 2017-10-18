
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		countDataList: []
	}
	static defaultProps = {
		actionId: 'BusTallyCount'
	}
	onSelectType(data, val, e){
		let me = this;
		data.checked = !e.target.checked;
		return me.updateComponent();
	}
	onSelectAllType(key, val, e){
		let me = this;
		let {state: {countDataList}} = me;
		let checked = !e.target.checked;
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
