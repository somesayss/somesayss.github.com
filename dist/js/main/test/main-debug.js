"use strict";

/**
 * 业务
 */
define("main/test/main-debug", [ "common/base-debug", "github/main/test/config-debug" ], function(require, exports, module) {
    //依赖
    var Base = require("common/base-debug"), config = require("github/main/test/config-debug");
    var person = new Base(config);
    console.log(person.get("kiss"));
});

"use strict";

/**
 * 2014.04.29
 * 基础类。
 * version: 1.0.0
 */
define("common/base-debug", [ "common/class-debug", "common/attrs-debug", "common/aspect-debug" ], function(require, exports) {
    //依赖
    var Class = require("common/class-debug"), Attrs = require("common/attrs-debug"), Aspect = require("common/aspect-debug");
    //变量
    var E = function() {};
    //类
    var Base = Class.create({
        //接口
        Implements: [ Attrs, Aspect ],
        //初始化
        init: function(config) {
            var me = this;
            me.initAttrs(config);
            return me;
        },
        //销毁
        destroy: function() {
            var me = this;
            //清除事件
            me.clearEvents();
            //清除属性
            me.clearAttrs();
            //清除自定义属性方法
            for (var i in me) {
                if (me.hasOwnProperty(i)) {
                    delete me[i];
                }
            }
            //干掉销毁方法
            me.destroy = E;
            return me;
        }
    });
    //返回
    return Base;
});

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
define("common/class-debug", [], function(require, exports) {
    //初始化变量
    var Class = {}, Rex = /\w+/g;
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
            };
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
        "Implements,Statics".replace(Rex, function(a) {
            if (PROP && PROP.hasOwnProperty(a)) {
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
        };
        return subClass;
    };
    //类的继承
    Class.extend = function(PAR, PROP) {
        //参数控制
        if (typeof PAR !== "function") {
            throw "Class extend error!! parent class need a function";
        } else {
            return implement(extend(Class.create(), PAR), PROP);
        }
    };
    //类的实例化判断，修复的instanceof
    Class.instanceOf = function(OBJ, CLS) {
        return OBJ instanceof CLS && OBJ.constructor === CLS;
    };
    //静态属性
    Class.Statics = function(CLS, OBJ) {
        mix(CLS, OBJ);
    };
    //接口
    Class.Implements = function(CLS, ARR) {
        var item, prop = CLS.prototype;
        ARR = [].concat(ARR);
        while (item = ARR.shift()) {
            mix(prop, item.prototype || item, true);
        }
    };
    return Class;
});

"use strict";

/**
 * 2015.02.28
 * 属性类
 * version: 1.0.0
 * 提供最基础的 set get
 *
 * 属性初始化
 * initAttrs({
 * 		'name1': 'value1',
 * 		'name2': {value: 'name2'},
 * 		'name3': {set: function(){}, get: function(){}}
 * });
 * 属性设置
 * set('name1', 'value1');
 * set('name2', {value: 'value2'});
 * set('name1', {set: function(){}, get: function(){}});
 *
 * BUG:无法修复
 * var person = new Base({
		title: {
			get: function(){
				return '???';
			}
		},
		kiss: {
			get: function(){
				return this.title; //这个是可以用的
				return this.title + '!!!'; //这个是用不了的	==> return person.get('title') + '!!!'; 不支持新API的浏览器只能这样写
			}
		}
	});
	console.log(person.get('kiss'));
 * 
 * 
 */
define("common/attrs-debug", [ "common/class-debug" ], function(require, exports) {
    //依赖
    var Class = require("common/class-debug");
    //变量
    var objectDefineProperty = Object.defineProperty, REX = /\w+/g;
    //事件类
    var Attrs = Class.create({
        //初始化
        initAttrs: function(config) {
            var me = this;
            me.__attrs__ = me.__attrs__ || {};
            me.__attrsName__ = me.__attrsName__ || [];
            eachObj(config, function(val, key) {
                me.set(key, val);
            });
        },
        /**
		 * [set description]
		 * 没有这个属性:
		 * 		有配置 	:设置配置
		 * 		没配置	:设置默认
		 * 	已经存在属性
		 * 		有配置	:覆盖配置
		 * 		没配置	:设置值
		 */
        set: function(name, value, option) {
            var me = this, attrs = me.getAttrs("attrs"), attrsName = me.getAttrs("attrsName"), attrVal = attrs[name], newOption;
            //堆入数组 唯一
            !attrVal && attrsName.push(name);
            /**
			 * set('name', {value:'a1'}), set('name', {set:function(){},get:function(){}});
			 */
            if (isObject(value)) {
                option = value;
                value = option.value;
            }
            newOption = mixOptin(value, option);
            //ECMA 5.0
            if (!objectDefineProperty) {
                if (attrVal && !option) {
                    attrs[name] = value;
                } else {
                    objectDefineProperty(attrs, name, newOption);
                }
            } else {
                fixSet(attrVal && !option ? attrVal : attrs[name] = newOption, newOption.value, name, attrVal, attrs);
            }
            return me;
        },
        //获取
        get: function(name) {
            var me = this, attrs = me.getAttrs("attrs");
            //ECMA 5.0
            if (!objectDefineProperty) {
                return attrs[name];
            } else {
                return fixGet(attrs[name], attrs);
            }
        },
        //获取attr
        getAttrs: function(key) {
            var me = this, some = me["__" + key + "__"];
            if (!some) {
                me.initAttrs();
                return me["__" + key + "__"];
            } else {
                return some;
            }
        },
        //遍历
        eachAttrs: function(callback) {
            var me = this, attrs = me.getAttrs("attrs"), attrsName = me.getAttrs("attrsName");
            eachArr(attrsName, function(val, key) {
                callback(me.get(val), val);
            });
            return me;
        },
        //删除
        removeAttrs: function(keys) {
            var me = this, attrs = me.getAttrs("attrs"), attrsName = me.getAttrs("attrsName");
            keys.replace(REX, function(a) {
                var index;
                if ((index = indexOfArr(attrsName, a)) !== -1) {
                    attrsName.splice(index, 1);
                    delete attrs[a];
                }
            });
            return me;
        },
        //清除
        clearAttrs: function() {
            var me = this;
            me.__attrs__ = {};
            me.__attrsName__ = [];
            return me;
        }
    });
    //函数
    //默认空函数
    function K(k) {
        return k;
    }
    //判断是否是对象
    function isObject(obj) {
        return !!obj && Object.prototype.toString.call(obj) === "[object Object]";
    }
    //查询
    function indexOfArr(arr, ele, formIndex) {
        if (arr.indexOf) {
            return arr.indexOf(ele, formIndex);
        } else {
            var length = arr.length;
            formIndex = ~~formIndex;
            for (;formIndex < length; formIndex++) {
                if (arr[formIndex] === ele) {
                    return formIndex;
                }
            }
            return -1;
        }
    }
    //遍历数组
    function eachArr(arr, callback, context) {
        if (!arr.forEach) {
            return arr.forEach(callback, context);
        } else {
            var index = 0, length = arr.length;
            for (;index < length; index++) {
                callback.call(context, arr[index], index, arr);
            }
        }
    }
    //遍历对象
    function eachObj(obj, callback) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                callback(obj[key], key);
            }
        }
    }
    //复制
    function cloneConfig(config) {
        var O = {};
        eachObj(config, function(val, key) {
            O[key] = val;
        });
        return O;
    }
    //判断是否存在 set get
    function noSetGet(option) {
        return !option || !option.set && !option.get;
    }
    //格式化writable(只读)
    function formatWritable(writable) {
        return writable === void 0 ? true : !!writable;
    }
    //混合value, option
    function mixOptin(value, option) {
        option = option || {};
        //如果value存在设置默认可读为true
        if (noSetGet(option)) {
            return {
                value: option.value || value,
                writable: formatWritable(option.writable),
                enumerable: true,
                configurable: true,
                __isAttr__: true
            };
        } else {
            return {
                get: option.get || K,
                set: option.set || K,
                enumerable: true,
                configurable: true,
                __isAttr__: true
            };
        }
    }
    //修正的set
    function fixSet(option, value, name, attrVal, attrs) {
        if (noSetGet(option)) {
            if (formatWritable(attrVal && attrVal.writable)) {
                option.value = value;
            } else {
                throw "TypeError: Cannot redefine property: " + name;
            }
        } else {
            attrVal && option.set.call(attrs, value);
        }
    }
    //修正的get, 使用递归，来获取可能的值
    function fixGet(option, attrs) {
        var val;
        if (noSetGet(option)) {
            return option && option.value || option;
        } else {
            val = option.get.call(attrs);
            if (val && val.__isAttr__) {
                return fixGet(val, attrs);
            } else {
                return val;
            }
        }
    }
    //返回
    return Attrs;
});

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
define("common/class-debug", [], function(require, exports) {
    //初始化变量
    var Class = {}, Rex = /\w+/g;
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
            };
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
        "Implements,Statics".replace(Rex, function(a) {
            if (PROP && PROP.hasOwnProperty(a)) {
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
        };
        return subClass;
    };
    //类的继承
    Class.extend = function(PAR, PROP) {
        //参数控制
        if (typeof PAR !== "function") {
            throw "Class extend error!! parent class need a function";
        } else {
            return implement(extend(Class.create(), PAR), PROP);
        }
    };
    //类的实例化判断，修复的instanceof
    Class.instanceOf = function(OBJ, CLS) {
        return OBJ instanceof CLS && OBJ.constructor === CLS;
    };
    //静态属性
    Class.Statics = function(CLS, OBJ) {
        mix(CLS, OBJ);
    };
    //接口
    Class.Implements = function(CLS, ARR) {
        var item, prop = CLS.prototype;
        ARR = [].concat(ARR);
        while (item = ARR.shift()) {
            mix(prop, item.prototype || item, true);
        }
    };
    return Class;
});

"use strict";

/**
 * 2015.04.29
 * Aspect类
 * version: 1.0.0
 * 对事件增加 before after功能
 */
define("common/aspect-debug", [ "common/events-debug" ], function(require, exports) {
    //依赖
    var Events = require("common/events-debug");
    //变量
    var arrProSlice = Array.prototype.slice, except = [ "trigger" ];
    //对一些函数不包装，配置项，这里
    //类
    var Aspect = Events.extend({
        //之前
        before: function(methodName, callback) {
            var me = this;
            wrap(me, "before", methodName, callback);
            return me;
        },
        //之后
        after: function(methodName, callback) {
            var me = this;
            wrap(me, "after", methodName, callback);
            return me;
        }
    });
    //函数
    //查询
    function indexOfArr(arr, ele, formIndex) {
        if (arr.indexOf) {
            return arr.indexOf(ele, formIndex);
        } else {
            var length = arr.length;
            formIndex = ~~formIndex;
            for (;formIndex < length; formIndex++) {
                if (arr[formIndex] === ele) {
                    return formIndex;
                }
            }
            return -1;
        }
    }
    //包裹函数
    function wrap(me, when, methodName, callback) {
        var oldMethod, newMethod;
        //注册事件
        me.on(when + "Method." + methodName, callback);
        //获取老的方法
        oldMethod = me[methodName];
        //如果方法存在 且 方法未被包裹过 且 不在额外的配置项里面
        if (oldMethod && !oldMethod.__isAspect__ && indexOfArr(except, methodName) === -1) {
            //封装新的方法
            newMethod = me[methodName] = function() {
                var val;
                //触发先
                me.trigger("beforeMethod." + methodName);
                //获取老的返回值
                val = oldMethod.apply(me, arrProSlice.call(arguments));
                //触发后
                me.trigger("afterMethod." + methodName);
                return val;
            };
            newMethod.__isAspect__ = true;
        }
    }
    //返回
    return Aspect;
});

"use strict";

/**
 * 2015.02.28
 * 事件类
 * version: 1.0.1
 */
define("common/events-debug", [ "common/class-debug" ], function(require, exports) {
    //依赖
    var Class = require("common/class-debug");
    //变量
    var Rex = /(\w+)\.?(.*)/, //aaa.bbb || aaa
    arrProSlice = Array.prototype.slice;
    //事件类
    var Events = Class.create({
        //单个注册
        add: function(type, callback) {
            var me = this, meEvents = me.__events__, meEventsSpace, meEventsNameSpace, ns = getNameSpace(type);
            if (ns) {
                //初始化容器
                meEvents || (meEvents = me.__events__ = {});
                //初始化事件容器
                (meEventsSpace = meEvents[ns.eventType]) || (meEventsSpace = meEvents[ns.eventType] = []);
                meEventsSpace.push(callback);
                if (ns.nameSpace) {
                    //初始化事件命名空间容器
                    (meEventsNameSpace = meEventsSpace[ns.nameSpace]) || (meEventsNameSpace = meEventsSpace[ns.nameSpace] = []);
                    meEventsNameSpace.push(callback);
                }
            }
            return me;
        },
        //单个销毁
        remove: function(type) {
            var me = this, meEvents = me.__events__, meEventsSpace, meEventsNameSpace, ns = getNameSpace(type);
            if (ns && meEvents && (meEventsSpace = meEvents[ns.eventType])) {
                if (ns.nameSpace) {
                    (meEventsNameSpace = meEventsSpace[ns.nameSpace]) && forEach(meEventsNameSpace, function(a) {
                        removeTarget(meEventsSpace, a);
                    });
                    delete meEventsSpace[ns.nameSpace];
                } else {
                    delete meEvents[ns.eventType];
                }
            }
        },
        //多次
        on: function(type, callback) {
            var me = this;
            forEach(type.split(","), function(a) {
                me.add(a, callback);
            });
            return me;
        },
        //多次
        off: function(type) {
            var me = this;
            forEach(type.split(","), function(a) {
                me.remove(a);
            });
            return me;
        },
        //一次
        once: function(type, callback) {
            var me = this;
            forEach(type.split(","), function(a) {
                me.on(a, function() {
                    me.off(a);
                    callback.call(this);
                });
            });
            return me;
        },
        //触发
        trigger: function(type, context) {
            var me = this, meEvents = me.__events__, meEventsSpace, meEventsNameSpace, args = arrProSlice.call(arguments), ns = getNameSpace(args.shift());
            if (ns && meEvents && (meEventsSpace = meEvents[ns.eventType])) {
                //存在事件的命名空间
                if (ns.nameSpace) {
                    (meEventsNameSpace = meEventsSpace[ns.nameSpace]) && eachTrigger(meEventsNameSpace, me, args);
                } else {
                    eachTrigger(meEventsSpace, me, args);
                }
            }
            return me;
        },
        clearEvents: function() {
            var me = this;
            delete me.__events__;
            return me;
        }
    });
    //函数
    //获取命名空间
    function getNameSpace(type) {
        if (Rex.test(type)) {
            return {
                eventType: RegExp.$1,
                nameSpace: RegExp.$2
            };
        }
    }
    //数组删除目标元素
    function removeTarget(arr, tar) {
        var index = indexOf(arr, tar);
        if (index !== -1) {
            arr.splice(index, 1);
        }
    }
    function indexOf(arr, ele, formIndex) {
        if (!arr.indexOf) {
            return arr.indexOf(ele, formIndex);
        } else {
            var length = arr.length;
            formIndex = ~~formIndex;
            for (;formIndex < length; formIndex++) {
                if (arr[formIndex] === ele) {
                    return formIndex;
                }
            }
            return -1;
        }
    }
    //循环
    function forEach(arr, callback) {
        if (arr.forEach) {
            return arr.forEach(callback);
        } else {
            var index = 0, length = arr.length;
            for (;index < length; index++) {
                callback(arr[index], index, arr);
            }
        }
    }
    //循环触发
    function eachTrigger(arr, context, args) {
        forEach(arr.slice(0), function(f) {
            f.apply(context, args);
        });
    }
    //返回
    return Events;
});
