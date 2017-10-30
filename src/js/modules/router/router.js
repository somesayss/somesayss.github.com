"use strict";

import RouterBase from './routerBase';

class Router extends RouterBase {
	props = {
		// 默认跳转的地址
		defaultHash: '',
		// 全部地址
		linksList: [],
		// 白名单
		whiteList: [],
		// 404
		notFound: 'notFound',
		// 无权限
		noPermission: 'noPermission'
	}
	constructor(config){
		let me = super(config);
		limit.assignSuper(me.state, me.props, config);
		me.setDefaultHash();
	}
	setDefaultHash(){
		let me = this;
		let {state} = me;
		let parseHash = Router.parseHash();
		if( !parseHash && state.defaultHash ){
			Router.setHash(state.defaultHash);
		};
	}
};

export default Router;
