"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

  	// 依赖
  	const React = require('react');
  	const ReactDOM = require('reactDOM');
  	const limit = require('common/limit2.0');
  	const Actions = require('./controller').Actions;

  	// 组件
	class School extends React.Component {
		render(){ 
			var me = this,
				props = me.props;
			return (
				<div>
					{props.title} {props.name} <a href="javascript:;" onClick={Actions.change}>改变</a>
				</div>
			);
		}
	};

	return School;

});