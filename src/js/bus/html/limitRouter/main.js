"use strict";

const Router = require('modules/router/index');

let router = new Router({
	a(param){
		console.log('aaa', param);
	}
});

window.router = router;