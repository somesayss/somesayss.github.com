module.exports = (name) => {
	return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="renderer" content="webkit" /><!-- 360浏览器切换内核 webkit | ie-comp[IE6/7]? | ie-stand[IE8910]? -->
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1" /><!-- 手机头部设置 -->
<meta name="description" content="" />
<meta name="keywords" content=""  />
<title>${name}</title>
<!-- #公用静态资源 -->
	<!-- 未打包CSS --> 
	<!-- 已打包CSS -->
	<link rel="stylesheet" type="text/css" href="/dist/assets/icon/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="/dist/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/dist/css/main.css" />
<!-- /公用静态资源 -->
<!-- 脚本入口 -->
<script type="text/javascript" charset="utf-8" src="/dist/js/libs/common.js"></script>
<!-- /脚本入口 -->
</head>
<body class="fn-PaLe20 fn-PaTo20 fn-PaRi20 fn-PaBo20">
	<div id="container"></div>
</body>
</html>`;
};
