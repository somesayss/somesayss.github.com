"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var $ = require('$'),
		Common = require('./common'),
		React = require('react'),
		limit = require('limit');

	// 变量
	var IE8 = document.documentMode === 8;

	// 类	
	var Textarea = React.createClass({displayName: "Textarea",
		mixins: [Common],
		textareaChangeHandler: function(e){
			var me = this;
			me.changeHandler(e);
		},
		resize: function(){
			var me = this,
				node = me.node;
			if(me.guid === 0){
				// if(IE8){
				// 	me.guid++;
				// 	limit.delay(function(){ me.guid = 0; }, 1000);
				// };
				node.height( me.props.height || 16 );
				node.height( ( Math.max( node.prop('scrollHeight'), node.prop('clientHeight') ) ) - me.padHeight );
			};
			
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
					"data-maxlength": me.props.maxlength, 
					onChange: me.textareaChangeHandler})
			);
		},
		componentDidUpdate: function(){
			this.resize();
		},
		componentDidMount: function(){
			var me = this,
				node = $(me.refs.node),
				maxlength = me.props.maxlength;
			me.node = node;
			me.padHeight = node.outerHeight() - node.height();
			me.guid = 0;
			// 如果存在maxlength
			if(maxlength){
				var state = {};
				state[me.props.name] = me.props.value.slice(0, maxlength);
				me.setState(state);
			};
		}
	});

	// 接口
	module.exports = Textarea;

});