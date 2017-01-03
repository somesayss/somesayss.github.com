"use strict";

// 依赖
const React = require('react');
const ReactDOM = require('reactDOM');

// 组件类
const ShowImg = require('./index');

// 置入文档
ReactDOM.render(
	<ShowImg />, 
	document.getElementById('container')
);