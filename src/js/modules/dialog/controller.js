"use strict";
	
// 依赖
import Control from 'common/myReflux/control';

class Controller extends Control {
	state = {}
	static defaultProps = {
		width: 400,
		height: 200,
		actionId: 'dialog',
		onClose: limit.K,
		hasCover: true,
		hide: false,
		timeout: 0,
		useEsc: true
	}
};

export default Controller;

