"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Base = require('base');

	//类
	var Father = Base.extend({
		attrs: {
			surName: '邵',
			name: 'AA'
		},
		talk: function(){
			var me = this;
			console.log('我的名字是：' + me.get('surName') + ' ' + me.get('name'));
			return me;
		}
	});

	var Children = Father.extend({
		attrs: {
			name: 'BB'
		}
	});

	var ChildrenChild = Children.extend({
		attrs: {
			name: 'CC'
		}
	});
	new Father().talk();		//邵 AA
	new Children().talk();		//邵 BB
	new ChildrenChild({name: 'DD', surName: '红'}).talk();	//邵 CC




	$('#click').on('click', function(){
		$(this).css('height', '1000');
	});
	return;


	var originA = {
		a: 'aaa',
		b: 'bbb',
		d: {
			'd1': 'd1d1d1'
		}
	}

	var originB = {
		c: 'ccc',
		d: {
			'd2': 'd2d2d2'
		}
	}

	var newOrigin = $.extend(originA, originB);

	originB.d.d2 = 'ddddd';

	console.log(newOrigin.d === originB.d);

});