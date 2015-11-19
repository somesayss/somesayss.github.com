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
	var IE8 = document.documentMode === 8,
		REX_ENTER = /\r\n/g;

	// 类	
	var Textarea = React.createClass({
		mixins: [Common],
		textareaChangeHandler: function(e){
			var me = this;
			me.changeHandler(e);
		},
		resize: function(){
			var me = this,
				node = me.node;
			node.height( me.props.height || 16 );
			node.height( ( Math.max( node.prop('scrollHeight'), node.prop('clientHeight') ) ) - me.padHeight );
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
					data-maxlength={me.props.maxlength}
					onChange={me.textareaChangeHandler}></textarea>
			);
		},
		componentDidUpdate: function(){
			this.resize();
		},
		fixedMaxlength: function(maxlength, val){
			if(!IE8) return maxlength;
			var len = val.match(REX_ENTER);
			return len ? maxlength + len.length : maxlength;
		},
		componentDidMount: function(){
			var me = this,
				node = $(me.refs.node),
				maxlength = me.props.maxlength;
			me.node = node;
			me.padHeight = node.prop('clientHeight') - node.height();
			me.guid = 0;
			// 如果存在maxlength
			if(maxlength){
				var state = {};
				state[me.props.name] = me.props.value.slice( 0, me.fixedMaxlength(maxlength, me.props.value) );
				me.setState(state);
			}else{
				me.componentDidUpdate();
			};
		}
	});

	// 接口
	module.exports = Textarea;

});