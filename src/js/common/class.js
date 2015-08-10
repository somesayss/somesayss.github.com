"use strict";
/**
 * 2014.09.15
 * 类的初始创建和继承。
 * version: 1.0.1
 * 2015.02.27
 * 增加属性的方法: Implements, Statics
 * 2015.04.30
 * 修改了mix方法，在接口继承的时候如果要继承的类也是有继承关系的就需要把所有的属性和方法都继承过来
 * 2015.06.09
 * 修改了Statics方法可以传入多个
 * 2015.06.15
 * 对Statics也拥有继承特性，对于静态的属性，extend superClass 是不可修改的
 */
define(function(require, exports) {

	//初始化变量
	var Class = {},
		emptyArr = [],
		K = function (k){return k},
		Rex = /\w+/g;

	/**
	 * [默认是过滤 extend superClass的]
	 * @param  {[string]} key [名称]
	 * @return {[boolean]}     [是否为extend或者superClass]
	 */
	function noName(key){
		return key !== 'extend' && key !== 'superClass';
	}

	/**
	 * [mix 混合方法]
	 * @param  {Object} CUR [被混合的对象]
	 * @param  {Object} TAR [混合源]
	 * @return {Object} CUR	[被混合的对象]
	 */
	function mix(CUR, TAR, NEEDPROP, CALLBACK) {
		CALLBACK = typeof CALLBACK === 'function' ? CALLBACK : K;
		for (var i in TAR) {
			if ( (TAR.hasOwnProperty(i) || NEEDPROP) && CALLBACK(i) ) {
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
			//如果对象存在，不存在的情况是 extend 的时候会直接create();
			if(PROP){
				//如果没有属性的话就初始话一个空的数组，这个是为了做统一，保证全部运行
				!PROP[a] && (PROP[a] = emptyArr);
				//确保是静态属性
				if(PROP.hasOwnProperty(a)){
					Class[a](CLS, PROP[a]);
				}
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
	Class.Statics = function(CLS, ARR){
		ARR = [].concat(ARR);
		var item;
		//如果存在父级，对于父级方法属性的继承
		CLS.superClass && mix(CLS, CLS.superClass.constructor, false, noName);
		//属性的继承
		while(item = ARR.shift()){
			mix(CLS, item, false, noName);
		}
	}
	//接口
	Class.Implements = function(CLS, ARR){
		var item,
			prop = CLS.prototype;
		ARR = [].concat(ARR);
		while(item = ARR.shift()){
			//接口继承，如果是类的话就用原型属性，否者就用本身，但是会继承所有方法
			mix(prop, item.prototype || item, true);
		}
	}

	return Class;

});