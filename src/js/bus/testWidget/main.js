"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	//依赖
	var Widget = require('widget'),
		araleWidget = require('araleWidget');



	var A = Widget.extend({
		attrs: {
			element: '#aa'
		}
	});

	var a = new A().get('str');
	console.log(a, typeof a);

	return;

	var A = Widget.extend({
		attrs: {
			a: null
		}
	});

	var B = A.extend({
		attrs: {
			a: 0
		}
	})

	var a = new B();

	console.log(a.get('a'));

	return;

	var A = Widget.extend({
		events: {
			'click span': function(){
				console.log('A');
			}
		}
	});

	var B = Widget.extend({
		events: {
			'click b': function(){
				console.log('B');
			}
		}
	});


	var a = new A({element: '#aa'});
	var b = new B({element: '#aa'});//.destroy();
	var c = new A({element: '#aa'});

	// b.destroy();

	console.log(Widget.query('#aa'));







	return;
	var A = Widget.extend({
		attrs: {
			trigger: '#aa',
			template: '<div><span>ccccc</span><b>bbbbbb</b></div>'
		},
		events: {
			'click span': function(node){
				console.log(node, 'a');
			}
		}
	});

	var a = new A();
	a.delegateEvents(a.triggerNode, {
		'click span': function(node){
			console.log(node, 'b');
		}
	});
	a.delegateEvents({
		'click b': function(node){
			console.log(node, 'c');
		}
	})
	a.render();

	a.undelegateEvents(a.triggerNode);



	return;

	var A = Widget.extend({
		show: function(a){
			console.log(a);
			console.log( this.trigger('hello'),123 );
			return a + '2234';
		}
	})

	var a = new A().before('show', function(){
		console.log(arguments);
		console.log('before show1');
		return true;
		// return false;
	}).before('show', function(){
		console.log('before show2');
		// return false;
	}).after('show', function(){
		console.log(arguments);
	}).on('hello', function(){
		console.log('hello1');
		return 0;
	}).on('hello', function(){
		console.log('hello2');
		return false;
	})


	a.show('kiss');

	// A.show('kiss');



	return;
	var A = Widget.extend({
		events: {
			'click.a1': function(){
				console.log('class A1');
			},
			'click.a2': function(){
				console.log('class A2');
			}
		}
	});

	var B = A.extend({
		events: {
			'click.b1': function(){
				console.log('class B1');
			},
			'click.b2': function(){
				console.log('class B2');
			}
		},
		setup: function(){
			console.log(this.get('str'));
		}
	});

	var b = new B({
		trigger: '#aa',
		events: {
			'click.be': function(){
				console.log('class be');
			}
		}
	}).render();

	console.log(b);

});