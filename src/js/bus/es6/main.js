"use strict";
/**
 * 业务
 */

define(function (require, exports, module) {

	// 依赖
	var React = require('react'),
	    ReactDOM = require('reactDOM'),
	    EsLanguage = require('./EsLanguage'),
	    EsString = require('./EsString'),
	    EsNumber = require('./EsNumber'),
	    EsArray = require('./EsArray');

	window.limit = require('common/limit');

	var Es6 = React.createClass({
		displayName: 'Es6',

		render: function render() {
			var me = this,
			    props = me.props;
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					{ className: 'fn-FoSi24' },
					'Hello ECMAScript 6.0 ',
					React.createElement(
						'span',
						{ style: { fontSize: "0.5em" } },
						'参考：',
						React.createElement(
							'a',
							{ href: 'http://es6.ruanyifeng.com/#docs/string', target: '_blank', className: 'fn-link-blue' },
							'点这里'
						)
					)
				),
				React.createElement(EsLanguage, { title: '语法 Language & babel' }),
				React.createElement(EsString, { title: '字符 String' }),
				React.createElement(EsNumber, { title: '数字 Number' }),
				React.createElement(EsArray, { title: '数组 Array' })
			);
		}
	});

	// 置入文档
	ReactDOM.render(React.createElement(Es6, null), document.getElementById('content'));
});