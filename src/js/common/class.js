"use strict";
/**
 * 2014.09.15
 * 类的初始创建和继承。
 * version: 1.0.1
 * 2015.02.27
 * 增加属性的方法: Implements, Statics
 * 2015.04.30
 * 修改了mix方法，在接口继承的时候如果要继承的类也是有继承关系的就需要把所有的属性和方法都继承过来
 */
define(function(require, exports) {

	//初始化变量
	var Class = {},
		Rex = /\w+/g;

	/**
	 * [mix 混合方法]
	 * @param  {Object} CUR [被混合的对象]
	 * @param  {Object} TAR [混合源]
	 * @return {Object} CUR	[被混合的对象]
	 */
	function mix(CUR, TAR, NEEDPROP) {
		for (var i in TAR) {
			if (TAR.hasOwnProperty(i) || NEEDPROP) {
				CUR[i] = TAR[i];
			}
		}
		return CUR;
	}

	//空类
	function E() {}

	/**
	 * [createPro 原型链对象的创建]
	 * @return {Class}	[源类]
	 * @return {Object} [对象]
	 */
	function createPro(PRO) {
		var create = Object.create;
		//新的API
		if (create) {
			return create(PRO);
		} else if (PRO.__proto__) {
			return {
				__proto__: PRO
			}
		} else {
			E.prototype = PRO;
			return new E();
		}
	}

	/**
	 * [extend 继承方法]
	 * @param  {Class} PAR 	[子类]
	 * @param  {Class} SUB 	[父类]
	 * @return {Class} SUB	[子类]
	 */
	function extend(SUB, PAR) {
		//继承
		SUB.prototype = createPro(PAR.prototype);
		//构造器
		SUB.prototype.constructor = SUB;
		//超类
		SUB.superClass = PAR.prototype;
		return SUB;
	}

	/**
	 * [implement 接口继承？]
	 * @param  {Class}	CLS  [源类]
	 * @param  {Object}	PROP [属性]
	 * @return {Class}	CLS  [源类]
	 */
	function implement(CLS, PROP) {
		//对于Implements, Statics的特殊处理
		'Implements,Statics'.replace(Rex, function(a){
			if(PROP && PROP.hasOwnProperty(a)){
				Class[a](CLS, PROP[a]);
				delete PROP[a];
			}
		});
		//混合
		mix(CLS.prototype, PROP);
		return CLS;
	}

	//类的创建
	Class.create = function(PROP) {
		//源类
		function subClass() {
			var init = this.init;
			return init && init.apply(this, arguments);
		}
		//接口继承
		implement(subClass, PROP);
		//创建的时候把构造器指向源类
		subClass.prototype.constructor = subClass;
		//继承方法
		subClass.extend = function(PROP) {
			return Class.extend(subClass, PROP);
		}
		return subClass;
	}
	//类的继承
	Class.extend = function(PAR, PROP) {
		//参数控制
		if (typeof PAR !== 'function') {
			throw 'Class extend error!! parent class need a function';
		} else {
			return implement(extend(Class.create(), PAR), PROP);
		}
	}
	//类的实例化判断，修复的instanceof
	Class.instanceOf = function(OBJ, CLS) {
		return OBJ instanceof CLS && OBJ.constructor === CLS;
	}
	//静态属性
	Class.Statics = function(CLS, OBJ){
		mix(CLS, OBJ);
	}
	//接口
	Class.Implements = function(CLS, ARR){
		var item,
			prop = CLS.prototype;
		ARR = [].concat(ARR);
		while(item = ARR.shift()){
			mix(prop, item.prototype || item, true);
		}
	}

	return Class;

});