"use strict";

// 依赖
const React = require('react');
const ReactDOM = require('reactDOM');

// 组件类
const Page = require('./page/main');

// 置入文档
ReactDOM.render(
	<Page />, 
	document.getElementById('container')
);
