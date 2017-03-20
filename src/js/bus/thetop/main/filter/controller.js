"use strict";
	
// 依赖
const limit = require('limit');
const React = require('react');
const Control = require('common/myReflux/control');

class Controller extends Control {
	state = {
	}
	static defaultProps = {
		filterName: '年份',
		word: ['2016', '2017', '2018'],
		onChange: limit.K,
		defaultWord: ['2016']
	}
	constructor(props){
		super();
		let me = this;
		let {state} = me;
		let defaultWord = props.defaultWord;
		state.filterWord = props.word.map((val) => {
			return {
				key: val,
				selected: limit.contains(defaultWord, val)
			};
		});
	}
	onSelect(val){
		let me = this;
		let {state, props} = me;
		val.selected = !val.selected;
		me.updateComponent().then(() => {
			props.onChange(state.filterWord.filter((val) => {
				return val.selected;
			}).map((val) => {
				return val.key;
			}));
		});
	}
	onClearFilter(){
		let me = this;
		let {state, props} = me;
		state.filterWord.forEach((val) => {
			val.selected = false;
		});
		me.updateComponent().then(() => {
			props.onChange([]);
		});
	}
};

module.exports = Controller;