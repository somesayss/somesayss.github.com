"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

// const

// 组件类
class Filter extends React.Component {
	render(){
		let me = this;
		let	props = me.props;
		let {filterWord} = props;
		let selectWord = filterWord.filter((val) => {
			return val.selected;
		}).map((val) => {
			return val.key;
		}).join(' ');
		let parseWord = '';
		if( selectWord ){
			parseWord = `：${selectWord}`;
		};
		return (
			<div className="thetop-filter fn-MR10 fn-MB10">
				<h2>
					{props.filterName}{parseWord}
					{do{
						if(selectWord){
							<a href="javascript:;" className="ch-remove" onClick={Actions(me).clearFilter}>×</a>
						}
					}}
				</h2>
				<ul>
					{filterWord.map((val, key) => {
						return (
							<li key={key}>
								<a href="javascript:;" onClick={Actions(me).select.bind(me, val)} className={val.selected ? 'ch-chose' : ''}>
									{val.key}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
	
};

module.exports = Filter;
