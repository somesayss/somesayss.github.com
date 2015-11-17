"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var $ = require('$'),
		Common = require('./common'),
		React = require('react');

	// 类	
	var Textarea = React.createClass({
		mixins: [Common],
		textareaChangeHandler: function(e){
			var me = this,
				node = me.node,
				scrollHeight;
			me.changeHandler(e);
			node.height( me.props.height || 16 );
			scrollHeight = node.prop('scrollHeight');
			if(scrollHeight > me.scrollHeight){
				node.height(scrollHeight - me.padHeight);
			};
		},
		render: function(){
			var me = this;
			return (
				<textarea
					ref="node"
					style={ {width: me.props.width - 20, height: me.props.height} }
					name={me.props.name} 
					className={"fn-textarea " + (me.props.className||'')} 
					value={me.state[me.props.name]} 
					onChange={me.textareaChangeHandler}></textarea>
			);
		},
		componentDidMount: function(){
			var me = this,
				node = $(me.refs.node);
			me.node = node;
			me.scrollHeight = node.prop('scrollHeight');
			me.height = node.height();
			me.padHeight = me.scrollHeight - me.height;
		}
	});

	// 接口
	module.exports = Textarea;

});