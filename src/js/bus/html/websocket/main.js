"use strict";

// 依赖
const React = require('react');
const ReactDOM = require('reactDOM');

// 组件类
const LimitRate = require('./index');

// 置入文档
ReactDOM.render(
	<LimitRate />, 
	document.getElementById('container')
);