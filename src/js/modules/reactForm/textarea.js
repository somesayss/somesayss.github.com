"use strict";
/**
 * 组件类
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

define(function (require, exports, module) {

	// 依赖
	var $ = require('$'),
	    Common = require('./common'),
	    React = require('react'),
	    limit = require('limit');

	// 特殊处理的属性 width,height[style] className onChange onEnterPress value
	function reWriteClassName(className) {
		return "fn-textarea " + className;
	};

	function reWriteStyle(style, width, height) {
		return limit.extend({ width: width - 20, height: height }, style);
	};

	// 类	
	var Textarea = React.createClass({
		displayName: 'Textarea',

		mixins: [Common],
		getDefaultProps: function getDefaultProps() {
			return {
				width: 200,
				height: 100,
				name: 'defaultName',
				value: '',
				className: ''
			};
		},
		render: function render() {
			var me = this,
			    props = limit.clone(me.props),
			    state = me.state;
			// 重写属性
			props.className = reWriteClassName(props.className);
			props.style = reWriteStyle(props.style, props.width, props.height);
			props.value = state[props.name];
			props.onChange = me.changeHandler;
			props.onKeyPress = me.enterPress;
			return React.createElement('textarea', _extends({}, props, { ref: 'node' }));
		},
		textareaChangeHandler: function textareaChangeHandler(e) {
			var me = this;
			me.changeHandler(e);
		},
		resize: function resize() {
			var me = this,
			    node = me.node;
			node.height(me.props.height || 16);
			node.height(Math.max(node.prop('scrollHeight'), node.prop('clientHeight')) - me.padHeight);
		},
		componentDidUpdate: function componentDidUpdate() {
			this.resize();
		},
		componentDidMount: function componentDidMount() {
			var me = this,
			    node = $(me.refs.node),
			    maxlength = me.props.maxlength;
			me.node = node;
			me.padHeight = node.prop('clientHeight') - node.height();
			// 如果存在maxlength
			if (maxlength) {
				var state = {};
				state[me.props.name] = me.props.value.slice(0, maxlength);
				me.setState(state);
			} else {
				me.componentDidUpdate();
			};
		}
	});

	// 接口
	module.exports = Textarea;
});

/*

<textarea
	ref="node"
	style={ {width: me.props.width - 20, height: me.props.height} }
	name={me.props.name} 
	className={"fn-textarea " + (me.props.className||'')} 
	value={me.state[me.props.name]}
	data-maxlength={me.props.maxlength}
	onChange={ limit.cb(me.textareaChangeHandler) }></textarea>
*/
