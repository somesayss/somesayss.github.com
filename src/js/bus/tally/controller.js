"use strict";
	
// 依赖
import Control from 'common/myReflux/control';

import Ajax from 'modules/ajax/index';
import CalendarCompute from 'modules/calendarCompute/index';

class Controller extends Control {
	state = {
		list:[],
		nameList: [],
		countTime:[],
		initPage: false,
		searchType: {},
		nameListSelectValue: ''
	}
	constructor(){
		let me = super();
		me.setCountTime();
	}
	onGetCountDataList(){
		let me = this;
		return new Ajax({
			url: 'http://localhost:8080/tally/countDataList.json',
			data: me.state.countTime
		}).then((val) => {
			return val.map((val) => {
				if( val.type !== '大件' ){
					val.checked = true;
				}else{
					val.checked = false;
				};
				return val;
			});			
		});
	}
	onSearchSuccess(response){
		let me = this;
		let {state} = me;
		state.list = response.list.map((val) => {
			val.time = limit.formatDate(val.time, 'yyyy-MM-dd');
			return val;
		});
		return me.updateComponent().then(me.getNameList.bind(me)).then(() => {
			if( !state.initPage ){
				state.initPage = true;
				return me.updateComponent();
			};
		});
	}
	onSelectCalendar(val){
		let me = this;
		let {state, props} = me;
		state.countTime = val;
		return me.updateComponent().then(() => {
			Actions('searchList').search();
		});
	}
	setCountTime(){
		let me = this;
		let {state: {countTime}} = me;
		let dateExp = new CalendarCompute();
		let date = dateExp.getDate();
		if( date < 15 ){
			// 获取上个月的15号
			dateExp.setMonth(dateExp.getMonth() - 1);
		};
		dateExp.setDate(15);
		countTime[0] = dateExp.parseTarget();
		// 下一个月的14号
		dateExp.setMonth(dateExp.getMonth() + 1);
		dateExp.setDate(14);
		countTime[1] = dateExp.parseTarget();
	}
	getNameList(){
		let me = this;
		return new Ajax({
			url: 'http://localhost:8080/tally/nameList.json'
		}).then((val) => {
			me.state.nameList = val;
			return me.updateComponent()
		});
	}
	toSaveFirst(){
		let me = this;
		let {state: {list}} = me;
		let saveList = list.filter((val) => {
			return val.isEdit;
		});
		if( saveList.length ){
			return me.onSave(saveList);
		}else{
			return Promise.resolve();
		};
	}
	getRealOne(val){
		let me = this;
		return me.state.list.filter((v) => {
			return v.id === val.id;
		});
	}
	onEdit(val,e){
		let me = this;
		let isEdit = val.isEdit;
		return me.toSaveFirst().then((success) => {
			let {state} = me;
			if( success ){
				state.actionStatus = 'edit';
			};
			me.getRealOne(val).forEach((v) => {
				v.isEdit = !isEdit;
			});
			return me.updateComponent();
		});
	}
	onDele(val){
		let me = this;
		return me.toSaveFirst().then(() => {
			me.getRealOne(val).forEach((v) => {
				v.isLoading = true;
			});
			return me.updateComponent()
		}).then(() => {
			return new Ajax({
				url: 'http://localhost:8080/tally/delete.json',
				dataName: 'param',
				data: {id: val.id}
			});
		}).then(() => {
			limit.remove(me.state.list, val);
			return me.reFlashData('delete');
		});
	}
	onChange(val, key, e){
		let me = this;
		let value = e.target ? e.target.value : e;
		val[key] = value;
		return me.updateComponent();
	}
	reFlashData(type, flag){
		let me = this;
		let {state} = me;
		switch(type){
			case 'save':
				if( flag ){
					return me.updateComponent().then(() => {
						Actions('searchList').start();
					});
				}else{
					return Actions('searchList').search();
				};
			break;
			case 'delete':
				if( state.list.length ){
					return Actions('searchList').search();
				}else{
					return Actions('searchList').totleMinus();
				};
			break;
		};
		
	}
	onSave(val){
		let me = this;
		val = [].concat(val);
		val.forEach((v) => {
			v.isLoading = true;
		});
		return me.updateComponent().then(() => {
			return new Ajax({
				url: 'http://localhost:8080/tally/save.json',
				dataName: 'param',
				data: val
			});
		}).then((response) => {
			let isNew = val.some((v) => !v.id);
			val.forEach((v) => {
				v.isLoading = false;
				v.isEdit = false;
			});
			return me.reFlashData('save', isNew);
		})
	}
	onAdd(){
		let me = this;
		return me.toSaveFirst().then((success) => {
			let {state} = me;
			let {list} = state;
			if( success ){
				state.actionStatus = 'add';
			};
			list.unshift({
				type: '',
				much: 0,
				time: limit.formatDate(undefined, 'yyyy-MM-dd'),
				isEdit: true
			});
			return me.updateComponent();
		});
	}
	onChangeNameList(val){
		let me = this;
		let {state} = me;
		state.nameListSelectValue = val;
		state.searchType = {type: val};
		return me.updateComponent().then(() => {
			Actions('searchList').start();
		})
	}
};

export default Controller;











