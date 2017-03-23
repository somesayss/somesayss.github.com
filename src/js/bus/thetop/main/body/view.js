"use strict";

import './style.less';

// 依赖
const React = require('react');
const limit = require('limit');

const Info = require('./info');
const List = require('./list');
const Page = require('modules/page/index');
const Filter = require('../filter/index');

// 组件类
class Body extends React.Component {
	constructor(){
		super(...arguments);
		let me = this;
	}
	render(){
		let me = this;
		let props = me.props;
		return (
			<div className="thetop-body">
				<div className="thetop-main fn-clear">
					<div className="ch-left">
						<div className="thetop-nav">
							{limit.keys(props.filterMap).map((val, key) => {
								return (
									<a href="javascript:;" key={key} className="ch-focus">{val}</a>
								);
							})}
						</div>
						<div className="thetop-sub fn-clear">
							{me.renderFilter()}
						</div>
						<div className="thetop-list">
							<List {...props} />
						</div>
						<div className="thetop-page">
							<Page totle={props.totle} onChangePage={Actions(me).changePage} page={props.page}/>
						</div>
					</div>
					<div className="ch-right">
						<Info {...props} />
					</div>
				</div>
			</div>
		);
	}
	renderFilter(){
		let me = this;
		let props = me.props;
		let arr = [];
		let filter = props.filter[props.focus];
		limit.each(props.filterMap[props.focus], (val, key) => {
			let filterTemp = filter[key];
			arr.push(<Filter key={key} filterName={key} word={val} defaultWord={filterTemp} onChange={Actions(me).changeFilter.bind(me, filterTemp)} />);
		});
		return arr;
	}
	componentDidMount(){
		let me = this;
		Actions(me).searchList().then(() => {
			Actions('layout').showLayout();
		}).then(() => {
			Actions('layout').setScrollTop();
		});
	}
};

module.exports = Body;

