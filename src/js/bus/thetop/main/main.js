"use strict";

// 组件类
const Layout = require('./layout/index');
const Body = require('./body/index');

// 置入文档
ReactDOM.render(
	<Layout>
		<Body></Body>
	</Layout>, 
	document.getElementById('container')
);