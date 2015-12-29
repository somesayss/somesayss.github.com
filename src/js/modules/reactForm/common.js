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
		STR_ENTER = '\r\n',
		shouldUpdateProps = false;

	// 类	
	var InputCommon = {
		getInitialState: function(){
			var state = {};
			state[this.props.name] = this.props.value;
			return state;
		},
		componentWillReceiveProps: function(){
			shouldUpdateProps = true;
		},
		componentDidUpdate: function(){
			 var me = this,
				newState,
				props = me.props,
				state = me.state,
				name = props.name;
			if( shouldUpdateProps ){
				shouldUpdateProps = false;
				newState = {};
				newState[name] = props.value;
				me.setState(newState);
			};
		},
		changeHandler: function(e){
			var me = this,
				props = me.props,
				name = props.name,
				self = $(e.target),
				type = self.prop('type'),
				val = self.val(),
				maxlength = self.data('maxlength'),
				onChange =  limit.cb(props.onChange),
				state = {};
			// 对于checkbox的特殊处理
			if( type === 'checkbox' ){
				if( self.prop('checked') ){
					me.state[name].push(val);
					state[name] = me.state[name];
				}else{
					state[name] = limit.without(me.state[name], val);
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
			onChange.call(me, state);
		},
		enterPress: function(e){
			var me = this,
				props = me.props;
			var enterPress = limit.cb(props.onEnterPress),
				keyPress = limit.cb(props.onKeyPress);
			if(e.charCode === 13){
				enterPress();
			};
			keyPress();
		}
	};

	// 接口
	module.exports = InputCommon;

});