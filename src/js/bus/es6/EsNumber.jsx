"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		Code = require('./code'),
		limit = require('limit'),
		Template = require('./template');

	// 类
	var EsNumber = React.createClass({
		render: function(){
			var me = this,
				props = me.props;
			return (
				<div>
					<Template title={props.title} attr="二进制，八进制新的表示法">
						<Code>
							0b10100	//二进制：20 <br />
							0o24 //八进制：20 <br />
							0x14 // 十六进制：20
						</Code>
					</Template>
					<Template title={props.title} attr="Number.isFinite()">
						更准确的判断有限数，原本的isFinite不够准确，会内部先转义成数字在进行判断
						<Code>
							Number.isFinite('1') //false isFinite('1') //true <br />
							Number.isFinite(null) //false isFinite(null) //true <br />
							Number.isFinite(true) //false isFinite(true) //true <br />
							Number.isFinite([]) //false isFinite([]) //true <br />
							Number.isFinite(new Date) //false isFinite(new Date) //true
						</Code>
					</Template>
					<Template title={props.title} attr="Number.isNaN()">
						更准确的判断有限数，原本的isNaN不够准确，会内部先转义成数字在进行判断
						<Code>
							Number.isNaN('a') //false isNaN('a') //true <br />
							Number.isNaN(undefined) //false isNaN(undefined) //true <br />
							Number.isNaN(['a']) //false isNaN(['a']) //true <br />
							Number.isNaN(obj) //false isNaN(obj) //true
						</Code>
					</Template>
					<Template title={props.title} attr="Number.isInteger()">
						判断是否为整数
						<Code>
							isNumber(n) && isFinite(n) && Math.floor(n) === n; //是数字，是有限数字，舍入后和原数一致
						</Code>
					</Template>
					<Template title={props.title} attr="Number.isSafeInteger()">
						判断是否为安全整数
						<Code>
							{'isInteger(n) && -9007199254740992 < n && n < 9007199254740992;'} //是整数，在安全范围内
						</Code>
					</Template>
				</div>
			);
		}
	});

	return EsNumber;

});