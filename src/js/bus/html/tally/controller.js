"use strict";
	
// 依赖
import Control from 'common/myReflux/control';
import Ajax from 'modules/ajax/index';

class Controller extends Control {
	state = {
		list:[{
			name: '早饭',
			much: -4,
			time: '2017-07-17'
		},{
			name: '中饭',
			much: 5,
			time: '2017-07-17'
		},{
			name: '晚饭',
			much: 6,
			time: '2017-07-17'
		}],
		nameList: ['早饭', '中饭', '晚饭'],
		originNameList: ['你好']
	}
	onEdit(val,e){
		let me = this;
		let {state} = me;
		let {list} = state;
		list.forEach((val) => val.isEdit = false);
		val.isEdit = true;
		me.updateComponent();
	}
	onDele(val){
		let me = this;
		let {state} = me;
		val.isLoading = true;
		me.updateComponent().then(() => {
			return new Ajax();
		}).then(() => {
			limit.remove(me.state.list, val);
			return me.setNameList();
		});
	}
	onChange(val, key, e){
		let me = this;
		let value = e.target ? e.target.value : e;
		val[key] = value;
		me.updateComponent();
	}
	setNameList(){
		let me = this;
		let {state} = me;
		let {list} = state;
		state.nameList = limit.union( list.map((val) => {
			return val.name;
		}).concat(state.originNameList) ).filter(limit.K);
		return me.updateComponent();
	}
	onSave(val){
		let me = this;
		val.isLoading = true;
		me.updateComponent().then(() => {
			return new Ajax();
		}).then(() => {
			val.isLoading = false;
			val.isEdit = false;
			return me.setNameList();
		});
	}
	onAdd(){
		let me = this;
		let {state} = me;
		let {list} = state;
		list.forEach((val) => val.isEdit = false);
		list.unshift({
			name: '',
			much: 0,
			time: limit.formatDate(undefined, 'yyyy-MM-dd'),
			isEdit: true
		});
		me.updateComponent();
	}
};



























module.exports = Controller;