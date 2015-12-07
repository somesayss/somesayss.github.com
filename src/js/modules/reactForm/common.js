"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var $ = require('$'),
		limit = require('limit');

	// 变量
	var IE8 = document.documentMode === 8,
		REX_ENTER = /\n/g,
		STR_ENTER = '\r\n';

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
				type = self.prop('type'),
				val = self.val(),
				maxlength = self.data('maxlength'),
				onChange =  limit.cb(this.props.onChange),
				state = {};
			// 对于checkbox的特殊处理
			if( type === 'checkbox' ){
				if( self.prop('checked') ){
					me.state[name].push(val);
					state[name] = me.state[name];
				}else{
					state[name] = limit.difference(me.state[name], val);
				};
			}
			// 对于textarea的特殊处理
			else if( type === 'textarea' && maxlength !== -1 ){
				var str = val.slice(0, maxlength);
				state[name] = IE8 ? str.replace(REX_ENTER, STR_ENTER) : str;
			}else{
				state[name] = val;
			};
			me.setState(state);
			onChange(state);
		}
	};

	// 接口
	module.exports = InputCommon;

});