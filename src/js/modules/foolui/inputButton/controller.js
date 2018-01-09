
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {
		isClick: false
	}
	static defaultProps = {
		actionId: 'FooluiInputButton',
		type: 'button',
		disabled: false,
		colorType: 'default',	// 颜色类型 default[灰色#F2F2F2] primary[蓝色#4285f4] warning[橘黄#F90] error[红色#F00]
		size: 'default', // default[30] big[40] small[25]
		value: '按 钮',
		onClick: limit.K
	}
	onClick(){
		let me = this;
		let {state, props} = me;
		if( !state.isClick ){
			state.isClick = true;
		};
		return me.updateComponent().then(() => {
			setTimeout(() => {
				me.state.isClick = false;
				me.updateComponent();
			}, 300);
		}).then(() => {
			return props.onClick();
		});
	}
};

export default Controller;
