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

  	// 非独立组件
  	const List = require('./list');

	class School extends React.Component {
		render(){ 
			var me = this,
				props = me.props;
			return (
				<div>
					<Title {...props} />
					{props.name} <a href="javascript:;" onClick={Actions.change}>改变</a>
					<List list={props.list} />
				</div>
			);
		}
	};

	return School;

});