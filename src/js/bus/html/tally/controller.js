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
		}]
	}
	onEdit(val){
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
		let {list} = state;
		val.isLoading = true;
		me.updateComponent().then(() => {
			return new Ajax();
		}).then(() => {
			limit.remove(list, val);
			return me.updateComponent();
		});
	}
	onChange(val, key, e){
		let me = this;
		val[key] = e.target.value;
		me.updateComponent();
	}
	onSave(val){
		let me = this;
		val.isLoading = true;
		me.updateComponent().then(() => {
			return new Ajax();
		}).then(() => {
			val.isLoading = false;
			val.isEdit = false;
			return me.updateComponent();
		});
	}
	onAdd(){
		let me = this;
		let {state} = me;
		let {list} = state;
		list.forEach((val) => val.isEdit = false);
		list.push({
			name: '',
			much: null,
			time: '',
			isEdit: true
		});
		me.updateComponent();
	}
};



























module.exports = Controller;