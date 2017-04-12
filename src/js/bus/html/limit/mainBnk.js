"use strict";

// 依赖
const $ = require('$');
const limit = require('limit');
const Router = require('common/router');
const Class = require('common/class');

class A {
	className: 'A'
	a(){}
}

class B extends A {
	className: 'B'
	b(){}
}

class C extends B {
	className: 'C'
	c(){}
}


let c = new C();

let D = Class.create({
	d: function(){}
});

let E = D.extend({
	e: function(){console.log('e')}
});

let F = E.extend({
	f: function(){}
});

let f = new F();

// console.log(f.constructor === F);
// console.log(E === f.__proto__.constructor);
// console.log(f.constructor.prototype.__proto__.constructor === E);
// console.log(f.constructor.prototype.constructor === F);
// console.log( f, f.__proto__);
// console.log( Object.getPrototypeOf+'' );
// console.log(f.constructor.prototype.__proto__ === E.prototype);


function findAllPro(obj){
	let rtv = {};
	let pro = obj.constructor.prototype;
	while(pro){
		// 如果到最底层的Object跳出
		if( pro.constructor === Object ){
			break;
		};
		limit(pro)
			.keysSuper()
			.each((val) => {
				// 隔离__proto__
				if( val !== '__proto__' && !rtv[val] ){
					rtv[val] = pro[val];
				};
			});
		pro = pro.__proto__;
	};
	return rtv;
};

limit.each( findAllPro(f), (val, key) => {
	console.log( key, val+'' );
} );

