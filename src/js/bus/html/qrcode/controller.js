"use strict";
	
// 依赖
const Ajax = require('modules/ajax/index');
const Control = require('common/myReflux/control');
const DialogWidget = require('modules/dialog/widget');

class Controller extends Control {
	state = {
		originData: {
			id: '',
			name: '',
			url: '',
			info: ''
		},
		listData: [],
		allSelect: false,
		initPage: false
	}
	onEditQrcode(data){
		let me = this;
		let {state} = me;
		state.originData = data;
		return me.updateComponent();
	}
	reloadPage(num){
		let me = this;
		let {state} = me;
		let {listData} = state;
		// 前一页
		if( num >= listData.length ){
			Actions('searchList').totleMinus();
		}else{
			Actions('searchList').search();
		};
	}
	onDeleteQrcode(data){
		let me = this;
		DialogWidget.confirm('确定要删除吗？', {width:300}).then(() => {
			return new Ajax({
				url: '/qrcode/delete.json',
				dataName: 'data',
				data: {ids: [data.id]}
			}).then((val) => {
				return me.reloadPage(1);
			});
		}, limit.K);
	}
	onDeleteListQrcode(){
		let me = this;
		let {state} = me;
		let ids = state.listData.map((val) => {
			if( val.selected ){
				return val.id;
			};
		}).filter(v => v);
		DialogWidget.confirm('确定要删除这些吗？', {width:300}).then(() => {
			return new Ajax({
				url: '/qrcode/delete.json',
				dataName: 'data',
				data: {ids: ids}
			}).then((val) => {
				return me.reloadPage(ids.length);
			});
		}, limit.K);
	}
	clearOriginData(){
		let me = this;
		let {state} = me;
		let {originData} = state;
		limit.each(originData, (val, key) => {
			originData[key] = '';
		});
	}
	onSubmit(){
		let me = this;
		let {state} = me;
		return new Ajax({
			url: '/qrcode/save.json',
			dataName: 'data',
			data: state.originData
		}).then((val) => {
			// DialogWidget.success(val.msg);
			me.clearOriginData();
			return me.updateComponent();
		});
	}
	onChange(name, val){
		let me = this;
		let originData = me.state.originData;
		if( val.target ){
			originData[name] = val.target.value;
		}else{
			originData[name] = val;
		};
	}
	onSelectAll(){
		let me = this;
		let {state} = me;
		let {listData} = state;
		state.allSelect = !state.allSelect;
		listData.forEach((val) => val.selected = state.allSelect);
		me.updateComponent();
	}
	onSelectOne(data){
		let me = this;
		let {state} = me;
		let {listData} = state;
		data.selected = !data.selected;
		if( listData.every((val) => !!val.selected) ){
			state.allSelect = true;
		}else{
			state.allSelect = false;
		};
		me.updateComponent();
	}
	onData(val){
		let me = this;
		let {state} = me;
		state.initPage = true;
		state.listData = val.list.map((val) => {
			if( state.allSelect ){
				val.selected = true;
			}
			return val;
		});
		me.updateComponent();
	}
};

module.exports = Controller;
































