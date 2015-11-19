"use strict";
/**
 * 组件类
 */
define(function(require, exports, module) {

	// 依赖
	var $ = require('$'),
		limit = require('limit');

	// 变量
	var IE8 = document.documentMode === 8;

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
				onChange = this.props.onChange,
				conf = {};
			// 对于checkbox的特殊处理
			if( type === 'checkbox' ){
				if( self.prop('checked') ){
					me.state[name].push(val);
					conf[name] = me.state[name];
				}else{
					conf[name] = limit.difference(me.state.like, val);
				};
			}
			// 对于textarea的特殊处理
			else if( type === 'textarea' && maxlength !== -1 ){
				var str = val.slice(0, maxlength);
				conf[name] = str;
				self.val(str.replace(/\n/g, '\r\n'));
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