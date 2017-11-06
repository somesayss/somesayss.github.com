"use strict";

import RouterBase from './routerBase';
import domUtil from 'common/domUtil';

const setHash = RouterBase.setHash;


class Router extends RouterBase {
	props = {
		// 全部地址
		linksList: [],
		// 默认地址
		defaultWhiteList: [],
		// 白名单[登陆后的]
		whiteList: null,
		// 404
		notFound: 'notFound',
		// 无权限
		noPermission: 'noPermission',
		// 登陆
		login: 'login'
	}
	constructor(config){
		let me = super(config);
		limit.assignSuper(me.state, me.props, config);
		me.bindHashChange();
	}
	checkHash(hash){
		let me = this;
		let {state: {linksList, notFound, noPermission, defaultWhiteList, whiteList, login}} = me;
		// hasn在地址里面
		if( limit.contains(linksList, hash) ){
			// 未登陆
			if( whiteList === null ){
				// 如果在默认权限表里
				if( limit(defaultWhiteList).concat([notFound, noPermission, login]).contains(hash).val() ){
					return true;
				}else{
				 	return setHash(login);
				};
			}else{
				 // 如果在权限表里 
				 if( limit(defaultWhiteList).concat(whiteList, [notFound, noPermission, login]).contains(hash).val() ){
				 	return true;
				 }else{
				 	return setHash(noPermission);
				 };
			};
		}else{
			return setHash(notFound);
		};
	}
};

export default Router;
