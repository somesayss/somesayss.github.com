"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var $ = require('$'),
		limit = require('limit');

	// 类	
	var InputCommon = {
		getInitialState: function(){
			var state = {};
			state[this.props.name] = this.props.value;
			return state;
		},
		changeHandler: function(e){
			var me = this,
				self = $(e.target),
				name = self.prop('name'),
				val = self.val(),
				onChange = this.props.onChange,
				conf = {}, reslute;
			// 对于checkbox的特殊处理
			if( self.prop('type') === 'checkbox' ){
				if( self.prop('checked') ){
					me.state[name].push(val);
					conf[name] = me.state[name];
				}else{
					conf[name] = limit.difference(me.state.like, val);
				};
			}else{
				conf[name] = val;
			};
			me.setState(conf);
			onChange && onChange(conf);
		}
	};

	// 接口
	module.exports = InputCommon;

});