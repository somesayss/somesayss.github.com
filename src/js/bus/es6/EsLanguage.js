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
	var EsLanguage = React.createClass({
		displayName: 'EsLanguage',

		render: function render() {
			var me = this,
			    props = me.props;
			return React.createElement(
				'div',
				null,
				React.createElement(
					Template,
					{ title: props.title, attr: 'const  & let' },
					React.createElement(
						Code,
						null,
						'const a = \'a1\'; ==> var a = \'a1\'',
						React.createElement('br', null),
						'let b = \'b1\'; ==> var b = \'b1\''
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: '对象的定义' },
					React.createElement(
						Code,
						null,
						'let O = ',
						'{ fn(){}, a: "a2" }',
						' ==> var  O = ',
						'{fn: function(){}, a: "a1"}'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: '字符串模板' },
					React.createElement(
						Code,
						null,
						'let a = \'a1\';',
						React.createElement('br', null),
						'console.log( `my name is $',
						'{c}',
						' haha` ); // my name is a1 haha'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: '解构' },
					React.createElement(
						Code,
						null,
						'let [a, b] = [\'a1\', \'b1\']; ==> var a = \'a1\', b = \'b1\'; ',
						React.createElement('br', null),
						'let ',
						'{a, b}',
						' = ',
						'{"a": "a1", "b": "b1"}',
						'; ',
						React.createElement('br', null),
						'==> ',
						React.createElement('br', null),
						'var o = ',
						'{"a": "a1", "b": "b1"}',
						'; ',
						React.createElement('br', null),
						'var a = o.a, b = o.b;'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: '类' },
					React.createElement(
						Code,
						null,
						'class A ',
						'{',
						'  constructor(name)',
						'{',
						' this.name = name; ',
						'}',
						' show()',
						'{',
						' console.log(this.name);',
						'}',
						' static xixi()',
						'{',
						' console.log(\'xixi\'); ',
						'}',
						' ',
						'}',
						'; ',
						React.createElement('br', null),
						'class B extends A ',
						'{',
						'  constructor(name, age)',
						'{',
						'  super(name); this.age = age; ',
						'}',
						' show()',
						'{',
						'  super.show(); console.log(this.age); ',
						'}',
						' ',
						'}',
						';'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: '默认参数' },
					React.createElement(
						Code,
						null,
						'function person(name = \'kiss\', age = 19)',
						'{',
						' console.log(name, age); ',
						'}',
						';'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: '不定参数' },
					React.createElement(
						Code,
						null,
						'let arr = [\'i1\', \'i2\', \'i3\']; ',
						React.createElement('br', null),
						'let arrCopy = [...arr]; ',
						React.createElement('br', null),
						'function per()',
						'{',
						'  console.log(arguments); ',
						'}',
						' ; ',
						React.createElement('br', null),
						'per(...arr);'
					)
				),
				React.createElement(
					Template,
					{ title: props.title, attr: '箭头函数' },
					React.createElement(
						Code,
						null,
						'let fn1 = (a, b) => a + b; ',
						React.createElement('br', null),
						'let fn2 = (a, b) => ',
						'{',
						' return a + b ',
						'}',
						'; ',
						React.createElement('br', null),
						'let fn3 = a => a;'
					)
				)
			);
		}
	});

	return EsLanguage;
});