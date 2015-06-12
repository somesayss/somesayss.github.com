/**
 * 新风格的计划入口
 * 邵红亮
 */
define(function(require, exports, module) {

	//依赖
	var Handlebars = require('handlebars');

	//公用宏
	Handlebars.registerHelper('log', function(msg){
		console.log(msg);
	});
	
	//编译 Compile
	
	//返回
	return Handlebars;

});
