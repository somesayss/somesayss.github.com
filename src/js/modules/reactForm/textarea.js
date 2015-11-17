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
	var Textarea = React.createClass({displayName: "Textarea",
		mixins: [Common],
		textareaChangeHandler: function(e){
			var me = this,
				node = me.node,
				scrollHeight;
			me.changeHandler(e);
			node.height( node.height() - 16 ).prop('scrollTop', 0);
			scrollHeight = node.prop('scrollHeight');
			if(scrollHeight > me.scrollHeight){
				node.height(scrollHeight - me.padHeight);
			}else{
				node.height( this.props.height || 16 );
			}
		},
		render: function(){
			var me = this;
			return (
				React.createElement("textarea", {
					ref: "node", 
					style:  {width: me.props.width - 20, height: me.props.height}, 
					name: me.props.name, 
					className: "fn-textarea " + (me.props.className||''), 
					value: me.state[me.props.name], 
					onChange: me.textareaChangeHandler})
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