"use strict";
	
// 依赖
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {}
	static defaultProps = {
		actionId: 'Cover',
		opacity: .3,
		background: '#FFF'
	}
};

export default Controller;

