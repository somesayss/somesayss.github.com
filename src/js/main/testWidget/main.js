"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Widget = require('widget'),
		araleWidget = require('araleWidget');

	var b = Widget.extend({
		attrs: {
			events: {
				'click': 'click1234'
			},
			template: '<div>234</div>',
			click123: function(){
				console.log(123);
			}
		}
	});
	var a = new b({
		// element: '#aa'
	}).render()//.render()//.destroy()//.init()//.undelegateEvents();

	// delete a.destroy
	// a.get('kiss');

	console.log(a);


});