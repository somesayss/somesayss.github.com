"use strict";
	
// 依赖
const $ = require('$');
const React = require('react');
const limit = require('limit');
const Control = require('common/myReflux/control');
const Ajax = require('modules/ajax/index');

class Controller extends Control {
	state = {
		totle: 100,
		number: 10,
		page: 1,
		list: [],
		filterMap: {
			'电影': {
				'年份': ['2012', '2013', '2014', '2015', '2016'],
				// '类型': ['喜剧', '剧情', '战争'],
				// '国家': ['中国大陆', '美国']
			}
		},
		focus: '电影'
	}
	constructor(){
		super();
		let me = this;
		let {state} = me;
		if( localStorage.page ){
			state.page = localStorage.page;
		};
		let filter = me.getLocalStorage('filter');
		state.filter = limit.keys(filter).length ?  filter : limit.map(state.filterMap, (val, key) => limit.map(val, () => []));
	}
	static defaultProps = {
		actionId: 'body'
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
		me.onChangePage(1);
	}
	getData(){
		let me = this;
		let {state} = me;
		let {number} = state;
		let start = number * ( state.page - 1 );
		let filter = state.filter[state.focus];
		let filterMap = JSON.stringify(filter);
		return {start, number, filterMap};
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
};

module.exports = Controller;






















