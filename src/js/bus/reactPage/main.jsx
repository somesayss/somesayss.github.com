"use strict";
/**
 * 模型
 */
define(function(require, exports, module) {

	// 依赖
	const React = require('react');
	const ReactDOM = require('reactDOM');

	// 组件类
	let Page = require('./page/main');
 	
 	class Page1 extends React.Component {
 		render(){
 			return (
 				<div>
 					<Page />
 					<Page />
 				</div>
 			)
 		}
 	}


	// 置入文档
	ReactDOM.render(
		<Page1 />,
	   	document.getElementById('container')
 	);

});