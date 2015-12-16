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
						更准确的判断有限数，原本的isFinite不够准确
						<Code>
							
						</Code>
					</Template>
				</div>
			);
		}
	});


	return EsNumber;

});