"use strict";

import Ajax from 'modules/ajax/index';

const map = {
	a(){
		return 'a1';
	},
	b(){
		return 'b1';
	}
};

Actions.pool = {
	a: [{
		a1(){
			return new Promise((s) => {
				setTimeout(() => {
					s('a11');
				}, 1000);
			});
		},
		a2(){return 'a21'}
	}, {
		a1(){return 'a12'},
		a2(){return 'a22'}
	}],
	b: [{
		b1(){return 'b1'},
		b2(){return 'b2'}
	}]
};

function getPool(id){
	let me = this;
	let pool = Actions.pool[id];
	if( pool ){
		return pool;
	}else{
		return [];
	};	
};

function get(){
	let pool = getPool('a');
	let obj = {};
	if( pool.length ){
		limit.keys(pool[0]).forEach((val) => {
			obj[val] = () => {
				return Promise.all( pool.map((fn) => {
					return fn[val]();
				}) );
			};
		});
	};
	return obj;
};

get().a1().then((val) => {
	console.log(val);
});
// console.log(a);

const a = {
	aaa: {
		bbb: {
			ccc: 'ddd'
		}
	},
	eee: 'fff'
};

let {aaa: {bbb : {ccc}}, eee} = a;











