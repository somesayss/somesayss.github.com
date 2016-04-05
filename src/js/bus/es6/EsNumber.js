"use strict";
/**
 * 业务
 */

define(function (require, exports, module) {

	// 依赖
	var React = require('react'),
	    Code = require('./code'),
	    limit = require('limit'),
	    Template = require('./template');

	// 类
	var EsNumber = React.createClass({
		displayName: 'EsNumber',

		render: function render() {
			var me = this,
			    props = me.props;
			return React.createElement(
				'div',
				null,
				React.createElement(
					Template,
					{ title: props.title, attr: '二进制，八进制新的表示法' },
					React.createElement(
						Code,
						null,
						'0b10100 //二进制：20 ',
						React.createElement('br', null),
						'0o24 //八进制：20 ',
						React.createElement('br', null),
						'0x14 // 十六进制：20'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: 'Number.isFinite()' },
					'更准确的判断有限数，原本的isFinite不够准确，会内部先转义成数字在进行判断',
					React.createElement(
						Code,
						null,
						'Number.isFinite(\'1\') //false isFinite(\'1\') //true ',
						React.createElement('br', null),
						'Number.isFinite(null) //false isFinite(null) //true ',
						React.createElement('br', null),
						'Number.isFinite(true) //false isFinite(true) //true ',
						React.createElement('br', null),
						'Number.isFinite([]) //false isFinite([]) //true ',
						React.createElement('br', null),
						'Number.isFinite(new Date) //false isFinite(new Date) //true'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: 'Number.isNaN()' },
					'更准确的判断有限数，原本的isNaN不够准确，会内部先转义成数字在进行判断',
					React.createElement(
						Code,
						null,
						'Number.isNaN(\'a\') //false isNaN(\'a\') //true ',
						React.createElement('br', null),
						'Number.isNaN(undefined) //false isNaN(undefined) //true ',
						React.createElement('br', null),
						'Number.isNaN([\'a\']) //false isNaN([\'a\']) //true ',
						React.createElement('br', null),
						'Number.isNaN(obj) //false isNaN(obj) //true'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: 'Number.isInteger()' },
					'判断是否为整数',
					React.createElement(
						Code,
						null,
						'isNumber(n) && isFinite(n) && Math.floor(n) === n; //是数字，是有限数字，舍入后和原数一致'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: 'Number.isSafeInteger()' },
					'判断是否为安全整数',
					React.createElement(
						Code,
						null,
						'isInteger(n) && -9007199254740992 < n && n < 9007199254740992;',
						' //是整数，在安全范围内'
					)
				)
			);
		}
	});

	return EsNumber;
});
