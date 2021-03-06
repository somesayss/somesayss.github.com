"use strict";
	
// 依赖
const $ = require('$');
const React = require('react');
const limit = require('limit');
const Control = require('common/myReflux/control');
const Ajax = require('modules/ajax/index');
const Copy =require('modules/copy/index');
const Dialog = require('modules/dialog/widget');
const Router = require('modules/router/index');

class Controller extends Control {
	state = {
		totle: 100,
		number: 10,
		page: 1,
		list: [],
		filterMap: {},
		filter: {},
		filterName: '',
		focus: '电影'
	}
	constructor(){
		let me = super();
		let {state} = me;
		if( localStorage.page ){
			// state.page = localStorage.page;
		};
	}
	static defaultProps = {
		actionId: 'body'
	}
	onGetFilterMap(){
		let me = this;
		let {state} = me;
		return new Ajax({
			url: '/thetop/filterMap.json'
		}).then((val) => {
			state.filterMap = val.filterMap;
		}).then(() => {
			let filter = me.getLocalStorage('filter');
			if( me.hasClearFilter() ){
				filter = {};
			};
			state.filter = limit.keys(filter).length ?  filter : limit.map(state.filterMap, (val, key) => limit.map(val, () => []));
		});
	}
	onChangeFilterName(val, showLayout){
		let me = this;
		let {state} = me;
		state.filterName = val;
		me.updateComponent();
		if( showLayout ){
			me.onChangePage(1);
		};
	}
	onInputFilterName(val){
		let me = this;
		let {state} = me;
		Router.setSearch({filterName: val}, 'search');
	}
	onSearchList(){
		let me = this;
		let {state, props} = me;
		return new Ajax({
				url: '/thetop/list.json',
				data: me.getData(),
				type: 'POST'
			}).then((val) => {
				state.totle = Math.ceil(val.count/state.number);
				let hideMovieData = me.getLocalStorage('hideMovie');
				val.list.forEach((val) => {
					if( hideMovieData[val.id] ){
						val.isHide = true;
					}else{
						delete val.isHide;
					};
				});
				state.list = val.list;
				return me.updateComponent();
		});
	}
	onChangePage(val){
		let me = this;
		let {state} = me;
		localStorage.page = state.page = val;
		me.onSearchList();
	}
	onHideIt(val){
		let me = this;
		val.isHide = true;
		me.setLocalStorage(val.id, true);
		me.updateComponent();
	}
	onShowIt(val){
		let me = this;
		delete val.isHide;
		me.setLocalStorage(val.id, false);
		me.updateComponent();
	}
	onChangeFilter(filter, keys){
		let me = this;
		let {state} = me;
		filter.length = 0;
		filter.push.apply(filter, keys);
		localStorage['filter'] = JSON.stringify(state.filter);
		// 如果ID查询的时候
		if( me.hasFilterId() ){
			Router.setHash('');
		};
		me.onChangePage(1);
	}
	getData(){
		let me = this;
		let {state} = me;
		let {number} = state;
		let start = number * ( state.page - 1 );
		let filter = state.filter[state.focus];
		let filterMap = JSON.stringify(filter);
		if( me.hasClearFilter() ){
			filterMap = '{}';
			start = 0;
			state.page = 1;
		};
		return limit.assign({start, number, filterMap}, me.mixSearch());
	}
	hasFilterId(){
		let hashParse = Router.parseHash();
		if( hashParse && hashParse.hash === 'search' ){
			let search = hashParse.search;
			return search.filterId;
		};
		return false;
	}
	hasClearFilter(){
		let hashParse = Router.parseHash();
		if( hashParse && hashParse.hash === 'search' ){
			let search = hashParse.search;
			return search.clearFilter;
		};
		return false;
	}
	mixSearch(){
		let me = this;
		let hashParse = Router.parseHash();
		if( hashParse ){
			return hashParse.search 
		};
	}
	setLocalStorage(id, flag){
		let me = this;
		let data = me.getLocalStorage('hideMovie');
		if( flag ){
			data[id] = true;
		}else{
			delete data[id];
		};
		localStorage['hideMovie'] = JSON.stringify(data);
	}
	getLocalStorage(key){
		let data = localStorage[key] || '{}';
		return JSON.parse(data)
	}
	onGetMovieNumber(){
		let me = this;
		return limit.keys( me.getLocalStorage('hideMovie') ).length;
	}
	onCopy(val, isOrigin){
		let href = null;
		if( isOrigin ){
			href = val;
		}else{
			let hash = encodeURIComponent(`search?filterId=${val}&clearFilter=true`);
			href = `http://${location.host}/thetop/main.htm#${hash}`;
		};
		if( new Copy({text: href}).isCopySuccess() ){
			Dialog.success(`成功复制，请直接粘贴`, {hasCover: false, timeout: 1000});
		}else{
			window.open(href);
		};
	}
	onZoomIn(val){
		let dia = new Dialog({
			width: 'auto', 
			height: 'auto',
			className: 'imgview',
			onClickCover(){
				dia.destroy()
			}
		}, null, <img src={val} onClick={() => { dia.destroy() }} />);
	}
	
};

module.exports = Controller;






















