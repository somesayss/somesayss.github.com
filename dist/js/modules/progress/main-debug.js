"use strict";

/**
 * 进度类
 */
define("modules/progress/main-debug", [ "modules/pie/main-debug", "common/methodUtil-debug" ], function(require, exports, module) {
    //依赖
    var Pie = require("modules/pie/main-debug"), methodUtil = require("common/methodUtil-debug");
    //类
    var Progress = Pie.extend({
        attrs: {
            //速度
            speed: 500,
            //每次最小偏差值
            minDiff: 30
        },
        //类名
        className: "Progress",
        //初始化
        initProps: function(config) {
            var me = this;
            //初始化队列
            me.queue = queue();
            return me;
        },
        //开始
        startPro: function(per) {
            var me = this;
            //强制转换
            per = getDiff(~~per);
            //重设上一个
            me.beforePro = 0;
            //设置现在值
            me.nowPro = per;
            //如果是0就直接设置，如果不是就绘制
            me[per === 0 ? "setPath" : "setPro"](per);
            return me;
        },
        //增加
        incPro: function(per) {
            var me = this, nowPro = per || me.nowPro;
            //获取随机值
            nowPro = methodUtil.getRandom(nowPro, nowPro + me.get("minDiff"));
            me.setPro(getDiff(nowPro));
            return me;
        },
        //设置 0 ~ 100
        setPro: function(nowPro, type) {
            var me = this, beforePro = ~~me.beforePro;
            me.beforePro = me.nowPro = nowPro;
            if (beforePro !== nowPro) {
                me.queue(function(next) {
                    animate(me, beforePro, nowPro, me.get("speed"), function(diff) {
                        me.setPath(diff);
                        diff === 100 && me.trigger("progressDone");
                    }, type);
                    setTimeout(next, me.get("speed"));
                });
            }
            return me;
        },
        //结束
        donePro: function() {
            var me = this;
            me.setPro(me.nowPro = 100, true);
            return me;
        }
    });
    //函数：队列
    function queue() {
        var list = [], doing = true;
        function next() {
            var fn = list.shift();
            if (fn) {
                fn(next);
            } else {
                doing = true;
            }
        }
        return function(callback) {
            if (list.push(callback) === 1 && doing) {
                doing = false;
                next();
            }
        };
    }
    //函数：正确获取偏差值
    function getDiff(diff) {
        if (diff < 0) {
            diff = 0;
        } else if (diff > 99) {
            diff = 99;
        }
        return diff;
    }
    //函数：动画函数
    var easing = {
        "in": function(pos) {
            return -(Math.pow(pos - 1, 2) - 1);
        },
        out: function(pos) {
            return Math.pow(pos, 2);
        }
    };
    //函数：动画
    function animate(me, begin, end, time, fn, type) {
        var beginTime = new Date().getTime(), diffPos = end - begin;
        methodUtil.cancelAnimationFrame(me.animateId);
        me.animateId = methodUtil.requestAnimationFrame(function loop() {
            var changeTime = new Date().getTime() - beginTime, diff = Math.floor(diffPos * easing[!type ? "in" : "out"](changeTime / time)) + begin;
            if (changeTime < time) {
                fn(diff);
                me.animateId = methodUtil.requestAnimationFrame(loop);
            } else {
                fn(end);
            }
        });
    }
    return Progress;
});

"use strict";

/**
 * 圆环类
 */
define("modules/pie/main-debug", [ "common/widget-debug", "common/domUtil-debug" ], function(require, exports, module) {
    //依赖
    var Widget = require("common/widget-debug");
    //类
    var Pie = Widget.extend({
        attrs: {
            //半径
            radius: 20,
            //偏差
            diffRadius: 1,
            //背景颜色
            backgroundColor: "#F2F2F2",
            //颜色
            color: "green",
            //字体大小
            fontSize: 12
        },
        //类名
        className: "Pie",
        //入口
        setup: function() {
            var me = this;
            return me.initSvg();
        },
        //销毁
        destroy: function() {
            var me = this;
            me.get("svg").remove();
            Pie.superClass.destroy.call(me);
            return me;
        },
        //SVG的渲染
        initSvg: function() {
            var me = this, radius = me.get("radius"), widthHeiht = radius * 2;
            //元素:SVG
            var svg = me.jQuery(getSvgElement("svg"));
            svg.attr({
                width: widthHeiht,
                height: widthHeiht
            });
            me.element.append(svg);
            //背景圆环
            me.setPath(100, renderPath(svg, me, me.get("backgroundColor")));
            //存储
            me.set("svg", svg);
            me.set("path", renderPath(svg, me, me.get("color")));
            me.set("text", renderText(svg, me, me.get("color")));
            return me;
        },
        //设置D属性
        setPath: function(per, target) {
            var me = this, path = target || me.get("path");
            if (0 <= per && per <= 100) {
                path.attr("d", getPathByAngle(me, per / 100 * 359.99));
                !target && me.get("text").text(per);
            } else {
                me.log("百分比大于100，或者小于0。");
            }
            return me;
        }
    });
    //构建元素Path
    function renderPath(svg, me, color) {
        var path = me.jQuery(getSvgElement("path"));
        path.attr("fill", color);
        svg.append(path);
        return path;
    }
    //构建文字
    function renderText(svg, me, color) {
        var text = me.jQuery(getSvgElement("text")), fontSize = me.get("fontSize"), radius = me.get("radius");
        text.attr({
            fill: color,
            x: radius,
            y: radius,
            dy: fontHeight(fontSize),
            "text-anchor": "middle",
            "font-size": fontSize + "px",
            opacity: .7
        });
        svg.append(text);
        return text;
    }
    //获取字体大小和高度
    function fontHeight(size) {
        return (size - size * 2 / 10) / 2;
    }
    //初始化元素
    function getSvgElement(type) {
        return document.createElementNS("http://www.w3.org/2000/svg", type);
    }
    //函数：获取D
    function getPathByAngle(me, angle) {
        var arr = [], radius = me.get("radius"), diffRadius = me.get("diffRadius"), smallRadius = radius - diffRadius, rad = radian(90 - angle), bigRaX = Math.cos(rad) * radius + radius, bigRaY = radius - Math.sin(rad) * radius, smaRaX = Math.cos(rad) * smallRadius + radius, smaRaY = radius - Math.sin(rad) * smallRadius, draw = angle <= 180 ? 0 : 1;
        //起始点
        arr.push("M " + radius + " 0");
        //外圈点
        arr.push("A " + radius + " " + radius + " 0 " + draw + " 1 " + bigRaX + " " + bigRaY);
        //中间点
        arr.push("L " + smaRaX + " " + smaRaY);
        //内圆点
        arr.push("A " + smallRadius + " " + smallRadius + " 0 " + draw + " 0 " + radius + " " + diffRadius);
        //闭合
        arr.push("Z");
        return arr.join(" ");
    }
    /**
	 * [radian 通过角度换算成弧度]
	 * @param  {Number} angle [角度]
	 * @return {Number}       [弧度]
	 */
    function radian(angle) {
        return angle * Math.PI / 180;
    }
    return Pie;
});

"use strict";

/**
 * 2014.05.28
 * 组件类。
 * version: 1.0.0
 * 2015,06,14 
 * 	1. 修改attrs中events里面的回调找的是this里面的函数而不是attrs里面的函数
 *  2. 对于element的data-xxx属性可以进行config的设置
 * 2015,06,22
 *  1. events可以继承父级
 * 	2. 对element的data-xxx属性进行遍历，进行config的设置
 * 2015,06,28
 * 	1. 对data自持更多
 * 	2. 如果element是模板构建的，如果存在triiger就把attr指向trigger
 * 2015,07,20
 * 	1. 事件委派的功能增强
 * 2015,08,01
 * 	1. 事件的绑定命名空间增加了CID
 * 	2. 增加静态属性query获取组件
 * 	3. 正确的销毁组件
 */
define("common/widget-debug", [ "common/base-debug", "common/jQuery-debug", "common/domUtil-debug" ], function(require, exports) {
    //依赖
    var Base = require("common/base-debug"), $ = require("common/jQuery-debug"), domUtil = require("common/domUtil-debug");
    //变量
    var cid = 0, widgetEventsNS = ".widgetEvents", DOC = document, BODY = DOC.body, cacheWidget = {}, //存储组件的地方
    REX_DATA = /^data((?:-.+)+)$/, //严格匹配 data-a-b 只能一个"-"小写 这个有点弱
    REX_FIRST = /-([a-z])/g;
    // -a--b => a-B; -a-_b => a_b
    //类
    var Widget = Base.extend({
        attrs: {
            //触发器
            trigger: null,
            //DOM节点
            element: null,
            //委派事件
            events: null,
            //基础属性
            id: null,
            className: null,
            style: null,
            //模板
            template: "<div></div>",
            //父节点
            parentNode: BODY
        },
        //类名
        className: "Widget",
        //初始化
        init: function(config) {
            var me = this;
            //属性的初始化
            Widget.superClass.init.call(me, config);
            //构建element
            me.parseElement();
            //对element上的属性进行解析然后设置属性
            me.parseElementAttr();
            //构建triggerNode
            me.parseTrigger();
            //解析Trigger上的属性
            me.parseTriggerAttr();
            //初始化widgetID
            me.widgetCid = "" + cid++;
            //存储组件
            cacheWidget["widgetCid" + me.widgetCid] = me;
            //构建私有属性
            me.initProps();
            //渲染属性
            me.renderAttr();
            //入口
            me.setup();
            //初始化事件
            me.initEvents();
            //绑定事件
            me.delegateEvents();
            //返回this
            return me;
        },
        //销毁
        destroy: function() {
            var me = this;
            //解绑事件
            me.undelegateEvents();
            //销毁DOM
            me.widgetIsTemplate && me.element.remove();
            //销毁组件对象
            destroyWidget(me);
            //销毁对象
            Widget.superClass.destroy.call(me);
            return me;
        },
        //构建element
        parseElement: function() {
            var me = this, element = me.get("element");
            //如果没有指向element那就去寻找模板
            if (element === null) {
                element = $(me.get("template"));
                //增加标示
                me.widgetIsTemplate = true;
            } else {
                element = $(element);
            }
            //如果element构建失败就抛出错误
            if (element.length === 0) {
                me.limit.log("element构建失败。");
            }
            me.element = element;
            return me;
        },
        //解析element上的属性
        parseElementAttr: function() {
            return parseAttr(this, this.element);
        },
        //构建triggerNode
        parseTrigger: function() {
            var me = this, triggerNode = $(me.get("trigger"));
            if (triggerNode.length) {
                me.triggerNode = triggerNode;
            }
            return me;
        },
        //解析Trigger上的属性
        parseTriggerAttr: function() {
            var me = this, triggerNode = me.triggerNode;
            if (triggerNode && me.widgetIsTemplate) {
                return parseAttr(this, triggerNode);
            } else {
                return me;
            }
        },
        //构建私有属性
        initProps: Base.limit.K,
        //入口
        setup: Base.limit.K,
        //增加属性
        renderAttr: function() {
            var me = this, element = me.element, id = me.get("id"), className = me.get("className"), widgetCid = element.attr("widget-cid"), style = me.get("style");
            //属性的添加
            id && element.prop("id", id);
            className && element.addClass(className);
            style && element.css(style);
            //标记
            element.attr("widget-cid", widgetCid ? widgetCid + "," + me.widgetCid : me.widgetCid);
            return me;
        },
        //渲染DOM
        render: function() {
            var me = this, element = me.element, elementDom = element[0], parentNode = $(me.get("parentNode"));
            me.set("parentNode", parentNode);
            //如果element不在body标签里面需要渲染
            if (elementDom && !$.contains(BODY, elementDom)) {
                parentNode.append(element);
            }
            return me;
        },
        initEvents: function() {
            var me = this, attrsEvents = me.get("events"), recursiveEvents = me.recursiveAttrs("events"), events = recursiveEvents.origin, eventsArr = recursiveEvents.arr;
            me.limit.each(attrsEvents, function(val, key) {
                !events[key] && eventsArr.push(key);
            });
            me.set("events", me.limit.extend(recursiveEvents.origin, attrsEvents));
            me.set("eventsArr", eventsArr);
            return me;
        },
        //委派事件
        //1.delegateEvents(); 2.delegateEvents({...}); 3.delegateEvents(ele, {...});
        delegateEvents: function(element, events) {
            //element和events都是对象无法区分，所以这里用arguments.length区分三种情况
            var me = this, eventsArr, length = arguments.length;
            //1.delegateEvents();
            if (length === 0) {
                element = me.element;
                events = me.get("events");
                eventsArr = me.get("eventsArr");
            } else if (length === 1) {
                events = element;
                element = me.element;
                eventsArr = formatEventsArr(events);
            } else if (length === 2) {
                eventsArr = formatEventsArr(events);
            }
            // 初始化被委托时间的对象
            !me.delegateElements && (me.delegateElements = []);
            // 委派的元素
            !me.limit.contains(me.delegateElements, element) && me.delegateElements.push(element);
            // 事件注册
            me.limit.each(eventsArr, function(key, index) {
                var keys = key.split(" "), val = events[key], val = typeof val === "function" ? val : me[val] || me.K;
                element.on(keys[0] + widgetEventsNS + "widgetCid" + me.widgetCid, keys[1], function(e) {
                    val.call(me, this, e);
                });
            });
            return me;
        },
        //销毁事件
        //1.undelegateEvents(); 2.undelegateEvents(ele);
        undelegateEvents: function(element) {
            var me = this, length = arguments.length, delegateElements;
            //1.undelegateEvents();
            if (length === 0) {
                delegateElements = me.delegateElements;
            } else if (length === 1) {
                delegateElements = [].concat(element);
            }
            me.limit.each(delegateElements, function(val) {
                val.off(widgetEventsNS + "widgetCid" + me.widgetCid);
            });
            return me;
        },
        //组件内遍历
        $: function(selector) {
            return this.element.find(selector);
        },
        jQuery: $,
        //继承属性
        Implements: {
            domUtil: domUtil
        },
        //静态属性
        Statics: {
            query: function(query) {
                var me = this, arr = [], widgetCids = $(query).attr("widget-cid");
                if (!widgetCids) return null;
                me.limit.each(widgetCids.split(","), function(val) {
                    var wid = cacheWidget["widgetCid" + val];
                    wid && arr.push(wid);
                });
                return arr.length === 1 ? arr[0] : arr;
            },
            domUtil: domUtil
        }
    });
    //函数:设置属性
    function setAttr(me, key, element) {
        if (key !== "element" && key !== "template") {
            var dataVal = element.data(key);
            dataVal && me.set(key, dataVal);
        }
    }
    //函数:解析节点的data-api
    function parseAttr(me, element) {
        var dataset;
        if (dataset = element[0].dataset) {
            Base.limit.each(element[0].dataset, function(val, key) {
                setAttr(me, key, element);
            });
        } else {
            console.log(element);
            parseAttrByAttributes(element[0].attributes, function(val, key) {
                setAttr(me, key, element);
            });
        }
        return me;
    }
    //函数:用属性值解析
    function parseAttrByAttributes(attributes, callback) {
        Base.limit.each(attributes, function(val, index) {
            var key = val.nodeName;
            if (REX_DATA.test(key)) {
                key = RegExp.$1.slice(1).replace(REX_FIRST, function(a, b) {
                    return b.toUpperCase();
                });
                callback(val.nodeValue, key);
            }
        });
    }
    //函数：
    function formatEventsArr(events) {
        var arr = [];
        Base.limit.each(events, function(val, key) {
            arr.push(key);
        });
        return arr;
    }
    //函数：销毁实例
    function destroyWidget(me) {
        var widgetCid = me.widgetCid, element = me.element, widgetCids = element.attr("widget-cid").split(",");
        //销毁对象
        delete cacheWidget["widgetCid" + widgetCid];
        //删除对应的值
        widgetCids.splice(me.limit.indexOf(widgetCids, widgetCid), 1);
        //重新赋值
        element.attr("widget-cid", widgetCids.join(","));
        // 如果等于空就删除这个属性
        element.attr("widget-cid") === "" && element.removeAttr("widget-cid");
    }
    //返回
    return Widget;
});

"use strict";

/**
 * 2014.04.29
 * 基础类。
 * version: 1.0.0
 * 2015,06,14 当attrs里面注册了onXxxx后，且值为函数，就会自动去注册事件
 * 2015,09,23 增加initBase入口方法
 */
define("common/base-debug", [ "common/class-debug", "common/attrs-debug", "common/aspect-debug", "common/limit-debug" ], function(require, exports) {
    //依赖
    var Class = require("common/class-debug"), Attrs = require("common/attrs-debug"), Aspect = require("common/aspect-debug"), limit = require("common/limit-debug");
    //变量
    var REX = /^on([A-Z])(.*)/;
    //类
    var Base = Class.create({
        //接口
        Implements: [ Attrs, Aspect, {
            limit: limit
        } ],
        //静态属性
        Statics: {
            limit: limit
        },
        //类名
        className: "Base",
        //初始化
        init: function(config) {
            var me = this, attrs = me.getAttrs("attrs");
            //把this塞入属性让attr内的属性调用 this.me
            attrs["me"] = me;
            attrs["get"] = function(k) {
                return me.get(k);
            };
            attrs["set"] = function(k, v) {
                return me.get(k, v);
            };
            //初始化配置属性
            me.initAttrs(config);
            //对属性当中的onXXX注册的属性都进行事件绑定
            bindEvent(me);
            //入口
            me.initBase();
            return me;
        },
        // 
        initBase: limit.K,
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
            return me;
        }
    });
    //事件绑定
    function bindEvent(me) {
        var attrs = me.getAttrs("attrs"), attrsName = me.getAttrs("attrsName");
        me.limit.breakEach(attrsName, function(key) {
            //如果on打头的
            if (REX.test(key)) {
                var val = me.get(key);
                typeof val === "function" && me.on(RegExp.$1.toLowerCase() + RegExp.$2, val);
            }
        });
    }
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
 * 2015.06.09
 * 修改了Statics方法可以传入多个
 * 2015.06.15
 * 对Statics也拥有继承特性，对于静态的属性，extend superClass 是不可修改的
 */
define("common/class-debug", [], function(require, exports) {
    //初始化变量
    var Class = {}, emptyArr = [], K = function(k) {
        return k;
    }, Rex = /\w+/g;
    /**
	 * [默认是过滤 extend superClass的]
	 * @param  {[string]} key [名称]
	 * @return {[boolean]}     [是否为extend或者superClass]
	 */
    function noName(key) {
        return key !== "extend" && key !== "superClass";
    }
    /**
	 * [mix 混合方法]
	 * @param  {Object} CUR [被混合的对象]
	 * @param  {Object} TAR [混合源]
	 * @return {Object} CUR	[被混合的对象]
	 */
    function mix(CUR, TAR, NEEDPROP, CALLBACK) {
        CALLBACK = typeof CALLBACK === "function" ? CALLBACK : K;
        for (var i in TAR) {
            if ((TAR.hasOwnProperty(i) || NEEDPROP) && CALLBACK(i)) {
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
            //如果对象存在，不存在的情况是 extend 的时候会直接create();
            if (PROP) {
                //如果没有属性的话就初始话一个空的数组，这个是为了做统一，保证全部运行
                !PROP[a] && (PROP[a] = emptyArr);
                //确保是静态属性
                if (PROP.hasOwnProperty(a)) {
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
    Class.Statics = function(CLS, ARR) {
        ARR = [].concat(ARR);
        var item;
        //如果存在父级，对于父级方法属性的继承
        CLS.superClass && mix(CLS, CLS.superClass.constructor, false, noName);
        //属性的继承
        while (item = ARR.shift()) {
            mix(CLS, item, false, noName);
        }
    };
    //接口
    Class.Implements = function(CLS, ARR) {
        var item, prop = CLS.prototype;
        ARR = [].concat(ARR);
        while (item = ARR.shift()) {
            //接口继承，如果是类的话就用原型属性，否者就用本身，但是会继承所有方法
            mix(prop, item.prototype || item, true);
        }
    };
    return Class;
});

"use strict";

/**
 * 2015.02.28
 * 属性类
 * version: 1.0.0 2015.02.28
 * version: 1.0.1 2015.05.27
 * version: 1.0.2 2015.05.29 对set('name', {})的支持
 * version: 1.0.3 2015.06.22 
 * 		1. 开放接口 recursiveAttrs 回溯对象
 *
 * 增加对attr:{} 属性的递归跟踪
 * 
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
 * PS:
 * 如果要set 一个对象 写法应该是 set('name', {value: {...}});
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
				return this.title + '!!!'; //这个是用不了的	==> return this.get('title') + '!!!'; 不支持新API的浏览器只能这样写
			}
		}
	});
	console.log(person.get('kiss'));
 *	2015.08.08
 *	1. 修改两处判断为 是否等于undefined 
 *	2015.08.23
 *	1.初始化方法分离
 * 	2015.09.23
 * 	1.增加方法 resetAttrs
 * 
 */
define("common/attrs-debug", [ "common/class-debug" ], function(require, exports) {
    //依赖
    var Class = require("common/class-debug");
    //变量
    var objectDefineProperty = Object.defineProperty, ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, isEcma5 = !!Object.create, //IE8 有Object.defineProperty的实现
    REX = /\w+/g, unshift = Array.prototype.unshift;
    //事件类
    var Attrs = Class.create({
        // 基础的初始化，和属性初始化分离
        initBseAttr: function() {
            var me = this;
            me.__attrs__ = me.__attrs__ || {};
            me.__attrsName__ = me.__attrsName__ || [];
        },
        //初始化
        initAttrs: function(config) {
            var me = this;
            eachObj(extendObj(me.recursiveAttrs("attrs").origin, config), function(val, key) {
                me.set(key, val);
            });
        },
        //重新设置
        resetAttrs: function(config) {
            var me = this;
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
            var me = this, attrs = me.getAttrs("attrs"), attrsName = me.getAttrs("attrsName"), attrVal = attrs[name], hasVal = attrs.hasOwnProperty(name), //用这个判断来取代 !!attrVal
            newOption;
            //堆入数组 唯一
            !hasVal && attrsName.push(name);
            /**
			 * set('name', {value:'a1'}), set('name', {set:function(){},get:function(){}});
			 * 2015 05 29
			 * 这里判断有点弱 只判断 value 是否为对象 应该判断 value 是否 存在 value 且存在 get 或者 set
			 */
            if (isObject(value) && (value.hasOwnProperty("value") || !noSetGet(value))) {
                option = value;
                value = option.value;
            }
            newOption = mixOptin(value, option);
            //ECMA 5.0
            if (isEcma5) {
                if (hasVal && !option) {
                    attrs[name] = value;
                } else {
                    objectDefineProperty(attrs, name, newOption);
                }
            } else {
                fixSet(hasVal && !option ? attrVal : attrs[name] = newOption, newOption.value, name, attrVal, attrs);
            }
            return me;
        },
        //获取
        get: function(name) {
            var me = this, attrs = me.getAttrs("attrs");
            //ECMA 5.0
            if (isEcma5) {
                return attrs[name];
            } else {
                return fixGet(attrs[name], attrs);
            }
        },
        //获取attr
        getAttrs: function(key) {
            var me = this, some = me["__" + key + "__"];
            if (!some) {
                me.initBseAttr();
                return me["__" + key + "__"];
            } else {
                return some;
            }
        },
        //遍历
        eachAttrs: function(callback) {
            var me = this, attrs = me.getAttrs("attrs"), attrsName = me.getAttrs("attrsName");
            callback = callback || me.K;
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
        },
        //递归
        recursiveAttrs: function(key) {
            var me = this, prop = me.constructor.prototype, superClass, origin = {}, arr = [], tempArr = [], attrs;
            while ((superClass = prop.constructor.superClass) && prop) {
                if (prop.hasOwnProperty(key) && (attrs = prop[key])) {
                    tempArr.length = 0;
                    //获取正确的顺序 为了events而做的
                    eachObj(attrs, function(val, key) {
                        origin[key] === void 0 && tempArr.push(key);
                    });
                    unshift.apply(arr, tempArr);
                    extendObj(origin, attrs, true);
                }
                prop = superClass;
            }
            return {
                origin: origin,
                arr: arr
            };
        }
    });
    //函数
    //默认空函数
    function K(k) {
        return k;
    }
    //判断是否是对象这里排除的dom对象, jQuery对象
    function isObject(obj) {
        return obj === Object(obj) && !obj.nodeType && !obj.jquery;
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
    //继承，由标记位控制是否是 正继承，还是负继承
    function extendObj(origin, target, flag) {
        !flag ? eachObj(target, function(val, key) {
            origin[key] = val;
        }) : eachObj(target, function(val, key) {
            origin[key] === void 0 && (origin[key] = val);
        });
        return origin;
    }
    //判断是否存在 set get
    function noSetGet(option) {
        return !option || !option.hasOwnProperty("set") && !option.hasOwnProperty("get");
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
            return option && option.value;
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
 * 2015.06.09
 * 修改了Statics方法可以传入多个
 * 2015.06.15
 * 对Statics也拥有继承特性，对于静态的属性，extend superClass 是不可修改的
 */
define("common/class-debug", [], function(require, exports) {
    //初始化变量
    var Class = {}, emptyArr = [], K = function(k) {
        return k;
    }, Rex = /\w+/g;
    /**
	 * [默认是过滤 extend superClass的]
	 * @param  {[string]} key [名称]
	 * @return {[boolean]}     [是否为extend或者superClass]
	 */
    function noName(key) {
        return key !== "extend" && key !== "superClass";
    }
    /**
	 * [mix 混合方法]
	 * @param  {Object} CUR [被混合的对象]
	 * @param  {Object} TAR [混合源]
	 * @return {Object} CUR	[被混合的对象]
	 */
    function mix(CUR, TAR, NEEDPROP, CALLBACK) {
        CALLBACK = typeof CALLBACK === "function" ? CALLBACK : K;
        for (var i in TAR) {
            if ((TAR.hasOwnProperty(i) || NEEDPROP) && CALLBACK(i)) {
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
            //如果对象存在，不存在的情况是 extend 的时候会直接create();
            if (PROP) {
                //如果没有属性的话就初始话一个空的数组，这个是为了做统一，保证全部运行
                !PROP[a] && (PROP[a] = emptyArr);
                //确保是静态属性
                if (PROP.hasOwnProperty(a)) {
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
    Class.Statics = function(CLS, ARR) {
        ARR = [].concat(ARR);
        var item;
        //如果存在父级，对于父级方法属性的继承
        CLS.superClass && mix(CLS, CLS.superClass.constructor, false, noName);
        //属性的继承
        while (item = ARR.shift()) {
            mix(CLS, item, false, noName);
        }
    };
    //接口
    Class.Implements = function(CLS, ARR) {
        var item, prop = CLS.prototype;
        ARR = [].concat(ARR);
        while (item = ARR.shift()) {
            //接口继承，如果是类的话就用原型属性，否者就用本身，但是会继承所有方法
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
 * 2015,07,12
 * 1.before after 的参数传递 before 会包含'方法'的函数，如果before返回false就无法触发 后面的 '方法' 和 after , after会有 '方法'的返回值和方法的参数
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
                var val, args = arrProSlice.call(arguments);
                //调整参数
                args.unshift("beforeMethod." + methodName);
                //触发先
                if (me.trigger.apply(me, args) === false) {
                    return me;
                }
                //调整参数
                args.shift();
                //获取老的返回值
                val = oldMethod.apply(me, args);
                //调整参数
                args.unshift(val);
                args.unshift("afterMethod." + methodName);
                //触发后
                me.trigger.apply(me, args);
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
 * 2015,07,12
 * 1.修改了trigger的返回值，除了回调函数返回false以外都是为true
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
                    return (meEventsNameSpace = meEventsSpace[ns.nameSpace]) && eachTrigger(meEventsNameSpace, me, args);
                } else {
                    return eachTrigger(meEventsSpace, me, args);
                }
            }
            return true;
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
        var val = true;
        forEach(arr.slice(0), function(f) {
            f.apply(context, args) === false && (val = false);
        });
        return val;
    }
    //返回
    return Events;
});

"use strict";

/**
 * 2015.10.8
 * 对ES的增强
 * version: 1.0.0
 */
define("common/limit-debug", [], function(require, exports) {
    // 变量
    var limit = {};
    // 原型对象
    var arrayProto = Array.prototype, objectProto = Object.prototype, functionProto = Function.prototype, stringProto = String.prototype;
    // DOM对象
    var WIN = window, DOC = WIN.document;
    // 原生原有的方法
    var slice = arrayProto.slice, splice = arrayProto.splice, concat = arrayProto.concat, unshift = arrayProto.unshift, push = arrayProto.push, toString = objectProto.toString, hasOwnProperty = objectProto.hasOwnProperty;
    // 原生ES5+的方法
    var nativeKeys = Object.keys, nativeCreate = Object.create, nativeForEach = arrayProto.forEach, nativeIndexOf = arrayProto.indexOf, nativeLastIndexOf = arrayProto.lastIndexOf, nativeMap = arrayProto.map, nativeFilter = arrayProto.filter, nativeEvery = arrayProto.every, nativeSome = arrayProto.some, nativeReduce = arrayProto.reduce, nativeReduceRight = arrayProto.reduceRight, nativeBind = functionProto.bind, nativeTrim = stringProto.trim;
    // 空函数
    var K = limit.K = function(k) {
        return k;
    };
    // 控制回调
    var cb = limit.cb = function(callback) {
        return isFunction(callback) ? callback : K;
    };
    // 空对象
    var O = limit.O = {};
    // 控制台
    var log = limit.log = function() {
        if (limit.logClosed) return;
        var args = slice.call(arguments), type = args.shift(), con = console || O, log;
        // 对type的处理可选值 'error'[默认]|'log'|'warn'
        // 这里可以优化用
        if (!contains([ "error", "log", "warn" ], type)) {
            args.unshift(type);
            type = "error";
        }
        log = con[type] || K;
        // IE10下的IE8调试模式，console.log是个对象 纯IE8下 log = K;
        try {
            args.unshift("limitJS " + type + ":");
            log.apply(con, args);
        } catch (e) {
            log("limitJS ", args);
        }
    };
    ///////////////////////////////////////////////////////
    // 基础判断方法
    // 基础类型 isString[字符] isUndefined[未定义] isNull[空] isBoolean[布尔] isNumber[数字] isDefined[定义]
    // 引用类型 isArray[数组] isFunction[函数] isObject[对象] isData[日期] isRegexp[正则] isError[错误]
    // 特殊的有 isArrayLike[类数组] isNaN[非数字] isFinite[有限数] isElement[元素] isArguments[参数] isMath[数学]
    // 增加判断 isEmpty[无] isEqual[是否一致] isBase[是否是基础类型]
    //////////////////////////////////////////////////////
    // 是否是未定义undefined
    var isUndefined = limit.isUndefined = function(n) {
        return n === void 0;
    };
    // 是否是定义
    var isDefined = limit.isDefined = function(n) {
        return !isUndefined(n);
    };
    // 是否是空null
    var isNull = limit.isNull = function(n) {
        return n === null;
    };
    // 是否是函数function
    var isFunction = limit.isFunction = function(n) {
        return typeof n === "function";
    };
    // 是否是布尔boolean
    var isBoolean = limit.isBoolean = function(n) {
        return n === true || n === false || toString.call(n) === "[object Boolean]";
    };
    // 是否是这些[string number array data regexp error]对象
    "String,Number,Array,Date,RegExp,Error,Math".replace(/\w+/g, function(k) {
        limit["is" + k] = function(n) {
            return toString.call(n) === "[object " + k + "]";
        };
    });
    var isNumber = limit.isNumber, isArray = limit.isArray, isDate = limit.isDate, isMath = limit.isMath, isError = limit.isError, isRegExp = limit.isRegExp, isString = limit.isString;
    // 是否是对象 除了5种基本类型以外都是对象
    var isObject = limit.isObject = function(n) {
        // typeof运算 function['function'] null['object'] 会有错误，对其进行纠正 还有个简单判断是 Object(n) === n;
        return isFunction(n) || typeof n === "object" && !!n;
    };
    // 是否是参数
    var isArguments = limit.isArguments = function(n) {
        return has(n, "callee");
    };
    // 是否是类数组
    // 有 length 属性的有
    // string array arguments nodeList jObject window[排除] function[排除]
    var isArrayLike = limit.isArrayLike = function(n) {
        // 和underscore不同，我把function排除了
        return !!n && isNumber(n.length) && !isFunction(n) && !isWin(n);
    };
    // 是否是NaN
    var limitIsNaN = limit.isNaN = function(n) {
        // 由于isNaN方法会预先 Number(n) 再去做判断 所以导致有些变量(+null = 0);返回错误
        return isNumber(n) && isNaN(n);
    };
    // 是否是有限的
    var limitIsFinite = limit.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n));
    };
    // 是否是空
    var isEmpty = limit.isEmpty = function(n) {
        // 如果是null undefined 为空
        if (n == null) return true;
        // 如果是类数组对象就比较是否为0, 其余的对象看他的静态方法
        return size(n) === 0;
    };
    // 是否是DOM元素
    limit.isElement = function(n) {
        return !!n && n.nodeType === 1;
    };
    // 判断是否是docuemtn
    limit.isDocument = function(n) {
        return !!n && n.nodeType === 9;
    };
    // 判断是否是window
    var isWin = limit.isWin = function(n) {
        return !!n && n.window === n && n.self === n;
    };
    // 比较 Sting Number Boolean 这三种类型 值转换比较 new String('123') == '123'
    var equalBaseArr = [ "String", "Number", "Boolean" ];
    // 判断基础类型
    function equalBase(a, b, type) {
        var fn = WIN[type];
        return fn(a) === fn(b);
    }
    // 比较对象
    function equal(a, b) {
        return size(a) === size(b) && every(getLoopKey(a), function(val, key) {
            return isEqual(a[val], b[val]);
        });
    }
    // 比较 注意: == 两个等号比较的时候 [2] == 2 返回为true
    var isEqual = limit.isEqual = function(a, b) {
        log("log", "limit.isEqual is called ", typeof a, ":", a, typeof b, ":", b);
        // 类型一致，值相同
        if (a === b) return true;
        // 类型不一致
        if (toString.call(a) !== toString.call(b)) return false;
        // 特殊类型 NaN 
        if (limitIsNaN(a)) return true;
        // 基础类型String Number Boolean
        var type;
        if (type = isBase(a, equalBaseArr)) return equalBase(a, b, type);
        // 特殊类型 date
        if (isDate(a)) return +a === +b;
        // 特殊类型 regExp
        if (isRegExp(a)) return "" + a === "" + b;
        // 特殊类型 function
        if (isFunction(a) && "" + a !== "" + b) return false;
        // 类数组以及其他
        return equal(a, b);
    };
    // 是否是基础类型
    var baseArr = [ "String", "Number", "Boolean", "Null", "Undefined", "RegExp", "Date", "Math", "Error" ];
    var isBase = limit.isBase = function(n, list) {
        !isArray(list) && (list = baseArr);
        var type = "";
        // 默认是8种
        some(list, function(val, key) {
            var fn = limit["is" + val];
            return fn && fn(n) && (type = val);
        });
        return type;
    };
    /////////////////
    // 字符串的方法
    // trim[去掉头尾空格]
    ////////////////
    // 去除两边的空格
    var REG_EXP_TRIM = /^\s+|\s+$/g;
    var trim = limit.trim = function(n) {
        // 格式化参数
        n = arguments.length ? n + "" : "";
        if (nativeTrim) return nativeTrim.call(n);
        return n.replace(REG_EXP_TRIM, "");
    };
    ///////////////
    // 数字的方法
    // random[随机数] toFixed[四舍五入最后几位] plus[加] minus[减] multiply[乘] except[除]
    // thousandSeparator[千分位] unThousandSeparator[逆千分位]
    //////////////
    // 随机数
    var random = limit.random = function(form, to) {
        // 格式化入参
        form = ~~form;
        to = ~~to;
        var max = Math.max(form, to), min = Math.min(form, to);
        return Math.floor((max - min + 1) * Math.random() + min);
    };
    var REG_THOUSAND_SEPARATOR = /(\d{1,3})(?=(\d{3})+$)/g, REG_THOUSAND_SEPARATOR_POINT = /(\d{1,3})(?=(\d{3})+\.)/g, REG_THOUSAND_SEPARATOR_COMMA = /,/g;
    // 千分位
    limit.thousandSeparator = function(num, med) {
        // 控制入参
        if (!limitIsFinite(num)) return log("warn", "limit.thousandSeparator is called ", typeof num, ":", num), 
        "";
        if (!isNumber(med)) med = 2;
        // 格式化
        return toFixed(num, med).replace(med ? REG_THOUSAND_SEPARATOR_POINT : REG_THOUSAND_SEPARATOR, "$1,");
    };
    // 反千分位
    limit.unThousandSeparator = function(str) {
        // 控制入参
        if (!isString(str)) return log("warn", "limit.unThousandSeparator is called ", typeof str, ":", str), 
        NaN;
        return +str.replace(REG_THOUSAND_SEPARATOR_COMMA, "");
    };
    // 数字的运算
    // 填充字符
    function padChar(n, len) {
        // 控制入参
        n == null && (n = "");
        n += "";
        len = ~~len;
        // 这个更快
        while (n.length < len) {
            n += n;
        }
        return n.slice(0, len);
    }
    // 确保为正整数
    function positive(num) {
        num = ~~num;
        return num < 0 ? 0 : num;
    }
    // 确认参数为数字
    function checkNum() {
        var flag = true;
        breakEach(concat.apply(arrayProto, arguments), function(val) {
            if (!limitIsFinite(val)) return log("warn", val, "the num is not a finite number"), 
            flag = false;
        });
        return flag;
    }
    // 获取最大的小数位
    function getMaxScale() {
        if (!checkNum.apply(undefined, arguments)) return;
        return Math.max.apply(Math, map(arguments, function(val) {
            return (("" + val).split(".")[1] || "").length;
        }));
    }
    // 右补齐
    function padRight(str, size) {
        // 控制入参size为正整数
        size = positive(size);
        // 切割
        return (str + padChar("0", size)).slice(0, size);
    }
    // 左补齐
    function padLeft(str, size) {
        // 控制入参size为正整数
        size = positive(size);
        // 切割
        return (padChar("0", size) + str).slice(-size);
    }
    // 小数点右移
    function movePointRight(sign, leftStr, rightStr, scale) {
        //如果 刻度比右边的字符长度小
        if (scale < rightStr.length) {
            return sign + leftStr + rightStr.slice(0, scale) + "." + rightStr.slice(scale);
        } else {
            return sign + leftStr + padRight(rightStr, scale);
        }
    }
    // 小数点左移
    function movePointLeft(sign, leftStr, rightStr, scale) {
        if (leftStr.length > scale) {
            return sign + leftStr.slice(0, -scale) + "." + leftStr.slice(-scale) + rightStr;
        } else {
            return sign + "0." + padLeft(leftStr, scale) + rightStr;
        }
    }
    // 小数点偏移
    function movePoint(num, scale) {
        // 控制入参
        if (!checkNum(num)) return;
        // 格式化num为字符串
        num += "";
        // 控制入参scale为整数
        scale = ~~scale;
        // 对于0的快速处理
        if (scale === 0) return num;
        var leftStr, rightStr, sign = "";
        // 切割字符串
        num = num.split(".");
        leftStr = num[0];
        rightStr = num[1] || "";
        //如果是负数对leftStr的处理
        if (leftStr.charAt(0) === "-") {
            sign = "-";
            leftStr = leftStr.slice(1);
        }
        return scale < 0 ? movePointLeft(sign, leftStr, rightStr, -scale) : movePointRight(sign, leftStr, rightStr, scale);
    }
    // chrome下0.295.toFixed(2) => 0.29这里做了兼容
    var toFixed = limit.toFixed = function(num, scale) {
        // 控制入参size为正整数
        scale = positive(scale);
        var num = movePoint(num, scale);
        return isUndefined(num) ? num : movePoint(Math.round(num), -scale);
    };
    // 加
    limit.plus = function() {
        var maxScale = getMaxScale.apply(undefined, arguments);
        if (isUndefined(maxScale)) return;
        return reduce.call(undefined, arguments, function(before, val) {
            return +movePoint(+movePoint(before, maxScale) + +movePoint(val, maxScale), -maxScale);
        });
    };
    // 减
    limit.minus = function() {
        var maxScale = getMaxScale.apply(undefined, arguments);
        if (isUndefined(maxScale)) return;
        return reduce.call(undefined, arguments, function(before, val) {
            return +movePoint(+movePoint(before, maxScale) - +movePoint(val, maxScale), -maxScale);
        });
    };
    // 获取所需要的值
    function getNeedNum(args, falg) {
        var tar = args[0] + "", arg = args[1] + "", medTar = (tar.split(".")[1] || "").length, medArg = (arg.split(".")[1] || "").length, num = falg ? +movePoint(+tar.replace(".", "") * +arg.replace(".", ""), -(medTar + medArg)) : +movePoint(+tar.replace(".", "") / +arg.replace(".", ""), medArg - medTar);
        args.splice(0, 2, num);
        return num;
    }
    // 乘
    var multiply = limit.multiply = function() {
        if (!checkNum.apply(undefined, arguments)) return;
        //格式化数字为字符串
        var args = toArray(arguments), num = getNeedNum(args, true);
        return args.length <= 1 ? num : multiply.apply(undefined, args);
    };
    // 除
    var except = limit.except = function() {
        if (!checkNum.apply(undefined, arguments)) return;
        //格式化数字为字符串
        //格式化数字为字符串
        var args = toArray(arguments), num = getNeedNum(args, false);
        // 如果计算结果为无线的情况反正真实值
        if (limitIsNaN(num)) return args[0] / args[1];
        return args.length <= 1 ? num : except.apply(undefined, args);
    };
    ///////////////
    // 对象的方法
    // has[含有静态方法] create[实例化] forIn[遍历] keys[静态属性] size[静态属性的个数] 
    // each[遍历静态属性] breakEach[可断开的遍历静态属性] extend[继承] defaults[反继承] clone[浅克隆] copy[深拷贝]
    //////////////
    // 静态方法
    var has = limit.has = function(n, k) {
        // 排除null & undefined 他俩没有hasOwnProperty方法
        return n != null && hasOwnProperty.call(n, k);
    };
    // 空的构造函数
    var E = function() {};
    // 简单的创建原型链对象
    // 和原生的差别是prop原生的可以入参为null而兼容方法不行 这里做了控制
    var create = limit.create = function(prop) {
        // 控制入参
        if (prop == null) return {};
        //如果存在原生的方法
        if (nativeCreate) {
            return nativeCreate(prop);
        } else if (prop.__proto__) {
            return {
                __proto__: prop
            };
        } else {
            E.prototype = prop;
            return new E();
        }
    };
    // 遍历
    var forIn = limit.forIn = function(obj, iterator, context) {
        // 排除 null undefined
        if (obj == null) return obj;
        for (var key in obj) {
            iterator.call(context, obj[key], key, obj);
        }
        return obj;
    };
    // 获取对象的静态属性
    // string array arguments nodeList 这三者只会查询到遍历值
    // 也就是说原生的类数组对象只会获取到遍历值
    var keys = limit.keys = function(obj) {
        // 排除 null undefined
        if (obj == null) return [];
        // 如果有原生的方法
        if (nativeKeys) return nativeKeys.call(Object, obj);
        var arr = [];
        forIn(obj, function(val, key) {
            has(obj, key) && arr.push(key);
        });
        return arr;
    };
    // 键名的数量
    var size = limit.size = function(obj) {
        return getLoopKey(obj).length;
    };
    // 获取键值
    function getLoopKey(obj) {
        return isArrayLike(obj) ? keys(toArray(obj)) : keys(obj);
    }
    // 私有遍历
    function loop(obj, iterator, context, isBreak, begin) {
        // 循环遍历
        var target = getLoopKey(obj), key, num = ~~begin, len = target.length;
        for (;num < len; num++) {
            key = target[num];
            if (iterator.call(context, obj[key], key, obj) === false && isBreak) break;
        }
        return obj;
    }
    // 遍历
    var each = limit.each = function(obj, iterator, context) {
        // 确保是函数
        iterator = cb(iterator);
        // 如果是类数组且原生的forEach存在
        if (isArrayLike(obj) && nativeForEach) return nativeForEach.call(obj, function(val, key) {
            // 由于原生forEach key的类型是数字型，所以进行下格式化
            iterator.call(this, val, "" + key);
        }, context);
        // 循环遍历
        return loop(obj, iterator, context);
    };
    // 可以被断开的遍历
    var breakEach = limit.breakEach = function(obj, iterator, context) {
        // 循环遍历
        return loop(obj, iterator, context, true);
    };
    // 继承 isOwn 控制是否是静态属性
    var extend = limit.extend = function(obj, isOwn) {
        // 控制入参
        if (!isObject(obj)) return obj;
        // 主函数
        function main(val, key) {
            obj[key] = val;
        }
        // 默认是全部拷贝
        if (isOwn !== true) {
            each(slice.call(arguments, 1), function(val) {
                // 继承所有的方法属性
                forIn(val, main);
            });
        } else {
            each(slice.call(arguments, 2), function(val) {
                // 继承静态的方法属性
                each(val, main);
            });
        }
        return obj;
    };
    // 反继承，继承的反意版
    var defaults = limit.defaults = function(obj, isOwn) {
        // 控制入参
        if (!isObject(obj)) return obj;
        // 主函数
        function main(val, key) {
            isUndefined(obj[key]) && (obj[key] = val);
        }
        // 默认是全部拷贝
        if (isOwn !== true) {
            each(slice.call(arguments, 1), function(val) {
                // 继承所有的方法属性
                forIn(val, main);
            });
        } else {
            each(slice.call(arguments, 2), function(val) {
                // 继承静态的方法属性
                each(val, main);
            });
        }
        return obj;
    };
    // 浅拷贝
    var clone = limit.clone = function(obj) {
        // 如果是基础对象
        if (isBase(obj)) {
            return copy(obj);
        }
        // 如果是函数
        if (isFunction(obj)) {
            return extend(function() {
                return obj.apply(this, arguments);
            }, obj);
        }
        // 函数
        if (isArray(obj)) {
            return slice.call(obj);
        }
        // 其他
        return extend({}, obj);
    };
    // 深拷贝
    var copyArr = [ "String", "Number", "Boolean", "Null", "Undefined" ];
    var copy = limit.copy = function(obj) {
        var type;
        // 如果是5个基础对象
        if (type = isBase(obj, copyArr)) {
            // 如果是对象
            return isObject(obj) ? new WIN[type](obj.valueOf()) : obj;
        }
        // 如果是Math对象
        if (isMath(obj)) {
            return obj;
        }
        // 如果是正则对象
        if (isRegExp(obj)) {
            return new RegExp(obj.source, (obj.global ? "g" : "") + (obj.multiline ? "m" : "") + (obj.ignoreCase ? "i" : ""));
        }
        // 如果是日期对象
        if (isDate(obj)) {
            return new Date(obj.getTime());
        }
        // 如果是错误对象
        if (isError(obj)) {
            return new Error(obj.message);
        }
        var value = {};
        // 如果是数组
        if (isArray(obj)) {
            value = [];
        }
        // 如果是函数
        if (isFunction(obj)) {
            value = function() {
                return obj.apply(this, arguments);
            };
        }
        // 拷贝属性
        forIn(obj, function(val, key) {
            value[key] = copy(val);
        });
        return value;
    };
    ///////////////
    // 数组的方法
    // toArray[格式化数组] getArray[正确获取数组] indexOf[查询遍历值] lastIndexOf[往后查询遍历值] 
    // forEach[遍历] map[重组]√ filter[赛选]√ every[全部符合]√ some[部分符合]√ 
    // reduce[从左往右迭代] reduceRight[从右往左迭代] contains[是否在数组当中] union[去重] flatten[解除嵌套数组]
    // whiteList[白名单] blacklist[黑名单]
    //////////////
    // 格式化数组
    var toArray = limit.toArray = function(obj) {
        // 如果是类数组对象的话就格式化数组
        // 会影响的类型:string array nodeList jObject arguments
        return isArrayLike(obj) ? slice.call(obj) : (log("warn", obj, "change into [], limit.toArray is called"), 
        []);
    };
    // 获取数组
    var getArray = limit.getArray = function(arr) {
        // 控制入参
        arr = toArray(arr);
        switch (arr.length) {
          case 0:
            return null;

          case 1:
            return arr[0];

          default:
            return arr;
        }
    };
    // 获取正序遍历值
    var indexOf = limit.indexOf = function(arr, ele, formIndex) {
        // 控制入参
        arr = toArray(arr);
        // 如果原生的方法存在
        if (nativeIndexOf) return nativeIndexOf.apply(arr, slice.call(arguments, 1));
        // 初始化返回值
        var index = -1;
        loop(arr, function(val, key) {
            if (val === ele) return index = key, false;
        }, undefined, true, ~~formIndex);
        // loop为了兼容返回值是string
        return +index;
    };
    // 获取倒叙遍历值
    var lastIndexOf = limit.lastIndexOf = function(arr, ele, formIndex) {
        // 控制入参
        arr = toArray(arr);
        // 如果原生的方法存在
        if (nativeLastIndexOf) return nativeLastIndexOf.apply(arr, slice.call(arguments, 1));
        // 初始化返回值
        formIndex = ~~formIndex;
        var len = arr.length - 1, index = indexOf(arr.reverse(), ele, arguments.length === 3 ? len - formIndex : formIndex);
        // 因为是倒叙
        return index === -1 ? -1 : len - index;
    };
    // 数组遍历
    var forEach = limit.forEach = function(arr, iterator, context) {
        // 控制入参
        arr = toArray(arr);
        // 确保是函数
        iterator = cb(iterator);
        // 原生的方法存在
        return each(arr, function(val, key) {
            // each的key都是string如果是数组的就格式化这也是each和forEach的一点区别
            iterator.call(this, val, +key, arr);
        }, context);
    };
    // 遍历替换 支持对象√
    var map = limit.map = function(arr, iterator, context) {
        // 如果是空就直接返回
        if (isEmpty(arr)) return arr;
        // 控制入参
        isArrayLike(arr) && (arr = toArray(arr));
        // 确保是函数
        iterator = cb(iterator);
        // 如果有原生方法
        if (nativeMap === arr.map) return nativeMap.call(arr, iterator, context);
        // 初始化数组
        var isArr = isArray(arr), result = isArr ? [] : {};
        // 遍历
        each(arr, function(val, key) {
            result[key] = iterator.call(this, val, key, arr);
        }, context);
        return result;
    };
    // 筛选
    var filter = limit.filter = function(arr, iterator, context) {
        // 如果是空就直接返回
        if (isEmpty(arr)) return arr;
        // 控制入参
        isArrayLike(arr) && (arr = toArray(arr));
        // 确保是函数
        iterator = cb(iterator);
        // 如果有原生方法
        if (nativeFilter === arr.filter) return nativeFilter.call(arr, iterator, context);
        // 初始化数组
        var isArr = isArray(arr), result = isArr ? [] : {};
        isArr ? each(arr, function(val, key) {
            iterator.call(this, val, key, arr) && result.push(val);
        }, context) : each(arr, function(val, key) {
            iterator.call(this, val, key, arr) && (result[key] = val);
        });
        return result;
    };
    // 全部为真 支持对象√
    var every = limit.every = function(arr, iterator, context) {
        // 如果是空直接返回
        if (isEmpty(arr)) return false;
        // 控制入参
        isArrayLike(arr) && (arr = toArray(arr));
        // 确保是函数
        iterator = cb(iterator);
        // 如果有原生方法
        if (nativeEvery === arr.every) return nativeEvery.call(arr, iterator, context);
        // 初始化
        var result = true, isArr = isArray(arr);
        breakEach(arr, function(val, key) {
            if (!iterator.call(this, val, isArr ? +key : key, arr)) return result = false;
        }, context);
        return result;
    };
    // 部分为真 支持对象√
    var some = limit.some = function(arr, iterator, context) {
        // 如果是空直接返回
        if (isEmpty(arr)) return false;
        // 控制入参
        isArrayLike(arr) && (arr = toArray(arr));
        // 确保是函数
        iterator = cb(iterator);
        // 如果有原生方法
        if (nativeSome === arr.some) return nativeSome.call(arr, iterator, context);
        // 初始化
        var result = false, isArr = isArray(arr);
        breakEach(arr, function(val, key) {
            if (iterator.call(this, val, isArr ? +key : key, arr)) return result = true, false;
        }, context);
        return result;
    };
    // 从左到右拼接数组
    var ERR_MSG_REDUCE = new TypeError("Reduce of empty array with no initial value");
    var reduce = limit.reduce = function(arr, iterator, init) {
        // 控制入参
        arr = toArray(arr);
        // 确保是函数
        var args = slice.call(arguments, 1);
        args[0] = iterator = cb(iterator);
        // 如果有原生方法
        if (nativeReduce) return nativeReduce.apply(arr, args);
        // 初始化
        var len = args.length, index = 0, noInit = len === 1, result = noInit ? arr[index++] : init;
        // 如果只有两个参数且数组为空的话就报错
        if (noInit && arr.length === 0) throw ERR_MSG_REDUCE;
        // 遍历
        loop(arr, function(val, key) {
            result = iterator.call(this, result, val, +key, arr);
        }, undefined, false, index);
        return result;
    };
    // 从右到做拼接数组 依赖：reduce
    var reduceRight = limit.reduceRight = function(arr, iterator, init) {
        // 控制入参
        arr = toArray(arr);
        // 确保是函数
        var args = slice.call(arguments, 1);
        args[0] = iterator = cb(iterator);
        // 如果有原生方法
        if (nativeReduceRight) return nativeReduceRight.apply(arr, args);
        var len = arr.length - 1;
        args.unshift(arr.reverse());
        args[1] = function(before, val, key, arr) {
            return iterator(before, val, len - key, arr);
        };
        return reduce.apply(undefined, args);
    };
    // 包含
    var contains = limit.contains = function(arr, target) {
        return indexOf(arr, target) !== -1;
    };
    // 去重
    var union = limit.union = function(arr, isEasy) {
        // 控制入参
        arr = toArray(arr);
        var target;
        // 如果是简单模式速度会很快
        if (isEasy) {
            return filter(arr.sort(), function(val, key) {
                return (!key || target !== val) && (target = val, true);
            });
        } else {
            // 安全模式默认是安全模式
            target = [];
            return filter(arr, function(val, key) {
                return !contains(target, val) && (target.push(val), true);
            });
        }
    };
    // 降位 [[[1]]] => 1
    var flatten = limit.flatten = function() {
        var value = [];
        forEach(arguments, function(val, key) {
            // concate 可以少几次循环
            push.apply(value, isArray(val) ? flatten.apply(undefined, concat.apply(arrayProto, val)) : [ val ]);
        });
        return value;
    };
    // 黑白名单判断
    function whiteBlack(factor, val1) {
        return some(factor, function(val2) {
            return every(val2, function(val3, key3) {
                return val3 === val1[key3];
            });
        });
    }
    // 数据白名单
    // limit.whiteList([], {}, {}, {});
    // limit.whiteList([], [{}, {}, {}]);
    limit.whiteList = function(arr) {
        // 控制入参
        arr = toArray(arr);
        // 控制条件
        var factor = flatten(slice.call(arguments, 1));
        if (isEmpty(factor)) return [];
        return filter(arr, function(val1) {
            return whiteBlack(factor, val1);
        });
    };
    // 数据黑名单
    limit.blacklist = function(arr) {
        // 控制入参
        arr = toArray(arr);
        // 控制条件
        var factor = flatten(slice.call(arguments, 1));
        if (isEmpty(factor)) return arr;
        return filter(arr, function(val1) {
            return !whiteBlack(factor, val1);
        });
    };
    ///////////////
    // 函数的方法
    // bind[绑定上下文] delay[延迟] defer[异步] once[单次] defered[多异步] when[执行]
    //////////////
    // 绑定上下文
    // 当做构造函数时候的时候会返回被绑定的构造函数的上下文
    // 兼容方法的时候 instanceof 会有区别
    var bind = limit.bind = function(fun) {
        // 控制入参
        if (!isFunction(fun)) return log(fun, "type is not function, limit.bind is called"), 
        K;
        // 存在原生方法
        if (nativeBind) return nativeBind.apply(fun, slice.call(arguments, 1));
        // 兼容的方法
        var args = slice.call(arguments, 1);
        function main() {
            // 如果当做普通函数
            if (!(this instanceof main)) {
                return fun.apply(args.shift(), concat.apply(args, arguments));
            } else {
                args.shift();
                var context = create(fun.prototype), tar = fun.apply(context, concat.apply(args, arguments));
                return isObject(tar) ? tar : context;
            }
        }
        return main;
    };
    // 延迟
    var delay = limit.delay = function(fun, wait) {
        var args = slice.call(arguments, 2);
        unshift.call(args, fun, undefined);
        return setTimeout(function() {
            bind.apply(undefined, args)();
        }, wait);
    };
    // 异步
    var defer = limit.defer = function() {
        var args = slice.call(arguments);
        args.splice(1, 0, 0);
        return delay.apply(undefined, args);
    };
    // 执行一次
    var once = limit.once = function(fun) {
        var args = slice.call(arguments, 2);
        unshift.call(args, fun, arguments[1]);
        return function main() {
            return !main.used ? (main.used = true, bind.apply(undefined, concat.apply(args, arguments))()) : undefined;
        };
    };
    // 异步执行后触发
    // JQ的defered[异步包裹] when[当] then[然后] always[一直] resolve[完成] reject[失败] done[成功] fail[失败]
    // my的defered[异步包裹] when[当] then[然后] always[一直] pass[传递][通过传递的参数确定是失败还是成功]
    var defered = limit.defered = function() {
        var main = {}, list = [], back = [ null ];
        // clean[私有]
        function clean() {
            var one, temp;
            if (one = list.shift()) {
                // 状态
                main.status = "pendding";
                defer(function() {
                    try {
                        var checkIsNull = ~~isNull(back[0]);
                        temp = back.slice(checkIsNull);
                        back.length = 0;
                        back[1] = one[one.allback ? "allback" : checkIsNull ? "sucback" : "errback"].apply(undefined, temp);
                        back[0] = null;
                    } catch (e) {
                        back[0] = e;
                    }
                    clean();
                });
            } else {
                main.status = "end";
            }
        }
        // 标记位
        main.isDefered = true;
        // status
        main.status = "init";
        // then
        main.then = function(sucback, errback) {
            // 入栈
            list.push({
                sucback: sucback || K,
                errback: errback || K
            });
            return main;
        };
        // always
        main.always = function(allback) {
            // 入栈
            list.push({
                allback: allback || K
            });
            return main;
        };
        // pass
        main.pass = function(err) {
            if (arguments.length) {
                back[0] = err;
                push.apply(back, slice.call(arguments, 1));
            }
            // 如果状态是初始化后
            clean();
            return main;
        };
        return main;
    };
    // 执行
    limit.when = function() {
        var theDefer = defered(), guid = arguments.length, sucArgs = [], errArgs = [];
        function endDo() {
            if (--guid <= 0) {
                var isSuc = isNull(getArray(errArgs));
                isSuc && sucArgs.unshift(null);
                theDefer.pass.apply(undefined, isSuc ? sucArgs : errArgs);
            }
        }
        forEach(arguments, function(val, key) {
            // 如果是异步对象
            if (val.isDefered) {
                val.then(function() {
                    sucArgs[key] = getArray(arguments);
                }, function() {
                    errArgs[key] = getArray(arguments);
                }).always(endDo);
                val.status === "end" && val.pass();
            } else if (isFunction(val)) {
                defer(function() {
                    try {
                        sucArgs[key] = val();
                    } catch (e) {
                        errArgs[key] = e;
                    }
                    endDo();
                });
            } else {
                sucArgs[key] = val;
                endDo();
            }
        });
        return theDefer;
    };
    ///////////////
    // 日期的方法
    // formatDate[格式化日期]
    ///////////////
    var REG_EXP_DATA = /^(yyyy)(?:(.+)(MM))?(?:(.+)(dd))?(?:(.+)(HH))?(?:(.+)(mm))?(?:(.+)(ss))?(.+)?$/, FUN_DATAS = [ "getFullYear", "getMonth", "getDate", "getHours", "getMinutes", "getSeconds" ];
    // 格式化日期
    limit.formatDate = function(timestamp, formatStr) {
        // 格式化入参
        !isNumber(timestamp) && (timestamp = +new Date());
        !isString(formatStr) && (formatStr = "yyyy-MM-dd HH:mm:ss");
        var date = new Date(timestamp);
        // 控制入参
        if (limitIsNaN(+date)) return log("warn", "formatDate is called", "timestamp:", timestamp, "date:", date), 
        "";
        // 正常入参
        return formatStr.replace(REG_EXP_DATA, function() {
            var arr = [];
            forEach(slice.call(arguments, 1, -2), function(val, key) {
                var value;
                if (val) {
                    if (key % 2 === 0) {
                        value = date[FUN_DATAS[key / 2]]();
                        // 如果是月份进一
                        val === "MM" && value++;
                        // 如果是非年补零
                        val !== "yyyy" && (value = (padChar("0", 2) + value).slice(-2));
                        arr.push(value);
                    } else {
                        arr.push(val);
                    }
                }
            });
            return arr.join("");
        });
    };
    return limit;
});

"use strict";

/**
 * jQuery 的桥梁
 */
define("common/jQuery-debug", [], function(require, exports) {
    return jQuery;
});

"use strict";

/**
 * 2015.02.28
 * dom工具类
 * version: 1.0.0
 */
define("common/domUtil-debug", [], function(require, exports) {
    //变量
    var domUtil = {};
    return domUtil;
});

"use strict";

/**
 * 2015.02.28
 * dom工具类
 * version: 1.0.0
 */
define("common/domUtil-debug", [], function(require, exports) {
    //变量
    var domUtil = {};
    return domUtil;
});

"use strict";

/**
 * 2015.02.28
 * 工具类
 * version: 1.0.0
 */
define("common/methodUtil-debug", [], function(require, exports) {
    //变量
    var methodUtil = {}, WIN = window;
    //标准的定时控制动画 这里有个BUG 不能直接使用 cache.requestAnimationFrame 需要把 var s = cache.requestAnimationFrame 保存在一个变量中
    var requestAnimationFrame = methodUtil.requestAnimationFrame = function(callback) {
        var fn = WIN.requestAnimationFrame || WIN.mozRequestAnimationFrame || WIN.webkitRequestAnimationFrame || WIN.msRequestAnimationFrame || WIN.oRequestAnimationFrame || function(callback) {
            return setTimeout(callback, 1e3 / 60);
        };
        return fn(callback);
    };
    //标准去定时控制动画
    var cancelAnimationFrame = methodUtil.cancelAnimationFrame = function(id) {
        var fn = WIN.cancelAnimationFrame || WIN.mozCancelAnimationFrame || WIN.webkitCancelAnimationFrame || WIN.msCancelAnimationFrame || WIN.oCancelAnimationFrame || function(id) {
            return clearTimeout(id);
        };
        return fn(id);
    };
    //获取随机数(整数)
    var getRandom = methodUtil.getRandom = function(x, y) {
        x = ~~x;
        y = ~~y;
        return Math.floor((y - x + 1) * Math.random() + x);
    };
    return methodUtil;
});
