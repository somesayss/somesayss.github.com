"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

  	// 依赖
  	const React = require('react');
  	const limit = require('common/limit2.0');
  	const Actions = require('./controller').Actions;

  	// 独立组件
  	const Title = require('../widget2/main');

	class List extends React.Component {
		render(){ 
			var me = this,
				props = me.props;
			return (
				<div>
					<ul>
						{props.list.map((val, key) => {
							return <li key={key}>{val} <a href="javascript:;" onClick={Actions.listChange.bind(me, key)}>改变</a></li>
						})}
					</ul>
				</div>
			);
		}
	};

	return List;

});