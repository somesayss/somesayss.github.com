"use strict";

limit.limitFixed = true;

function main(a, b){
	console.log(this, a, b);
};


limit.bind(main, 'a', 'b')('c');