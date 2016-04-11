"use strict";
/**
 * 组件类
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

define(function (require, exports, module) {

	// 依赖
	var Common = require('./common'),
	    limit = require('limit'),
	    React = require('react');

	// 过滤出Radio checkbox 的特质属性 name value onChange disabled checked
	var filterPropsList = ['name', 'value', 'onChange', 'disabled', 'checked', 'type'];

	function filterProps(props) {
		var obj = {};
		limit.each(props, function (val, key) {
			if (limit.contains(filterPropsList, key)) {
				obj[key] = val;
				delete props[key];
			};
		});
		return obj;
	};

	// 类	
	var InputSeed = React.createClass({
		displayName: 'InputSeed',

		getDefaultProps: function getDefaultProps() {
			return {
				name: 'defaultName',
				type: 'checkbox'
			};
		},
		render: function render() {
			var me = this,
			    props = limit.clone(me.props),
			    labelProps = filterProps(props);
			return React.createElement(
				'label',
				props,
				React.createElement('input', _extends({}, labelProps, { ref: 'input', style: { marginTop: "2px" } })),
				' ',
				props.text
			);
		}
	});

	// 接口
	module.exports = InputSeed;
});