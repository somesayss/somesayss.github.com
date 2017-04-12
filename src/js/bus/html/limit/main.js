"use strict";

// 依赖
class A {
	showA(){
		
	}
};

class B extends A {
	showB(){

	}

};

var b = new B;

console.log(b.__proto__);