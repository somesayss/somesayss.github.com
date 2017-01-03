# limit

babel编译依赖
	es5-shim v4.1.7
	es5-sham v4.1.7

安装依赖 npm install

启动服务 gulp server

测试路径 /test/limit.html

手动编译 gulp

是否是DOM元素
limit.isElement();
limit.isElement(document.body); //true

是否是文档
limit.isDocument();
limit.isDocument(document); //true

是否是window对象
limit.isWin();
limit.isWin(window); //true

是否是未定义
limit.isUndefined();
limit.isUndefined();  //true
limit.isUndefined(undefined);  //true

是否是定义
limit.isDefined();
limit.isDefined(null);  //true

是否是空
limit.isNull();
limit.isNull(null);   //true

是否是函数
limit.isFunction();
limit.isFunction(function aa(){console.log(111)});   //true

是否是布尔
limit.isBoolean();
limit.isBoolean(true);  //true

是否是这些[string number array data regexp error math]对象

是否是字符串
limit.isString();
limit.isString('111');   //true

是否是number
limit.isNumber();
limit.isNumber(111);   //true

是否是数组
limit.isArray();
limit.isArray(['1','2',1,2]);  //true

是否是日期对象
limit.isDate();
limit.isDate(new Date());  //true

是否是正则对象
limit.isRegExp();
limit.isRegExp(/^s/);  //true

是否是错误对象
limit.isError();
limit.isError(new Error());  //true

是否是Math对象
limit.isMath()
limit.isMath(Math);   //true  Math是一个对象，但不是构造函数

是否是对象
limit.isObject();
limit.isObject({a:1,b:2});  //true

是否是参数
limit.isArguments();
function main(){console.log(limit.isArguments(arguments))};main(1,2,3);  //true

是否是有length属性的对象
limit.isArrayLike();
limit.isArrayLike([1,2,3,4]);   //true

是否是NaN
limit.isNaN();
limit.isNaN(NaN);  //true

是否是有限的
limit.isFinite();
limit.isFinite(1);  //true

是否为整数
limit.isInteger();
limit.isInteger(1);   //true

是否为安全整数
limit.isSafeInteger();
limit.isSafeInteger(9007199254740991);  //true  -9007199254740992<n<9007199254740992

是否为空
limit.isEmpty();
limit.isEmpty('a');   //false

获取唯一的uid
limit.getUid();
limit.getUid();  //0.0.1

判断对象中是否存在某个属性
limit.has();
limit.has([1,2,3],1);   //true

判断是不是函数
limit.cb();
limit.cb(function(i){console.log(111)});  //function(i){console.log(111)} 

遍历
limit.forin();
limit.forin([1,2,3],function(i,j){console.log(i,j)});   //1 "0" 2 "1" 3 "2"

循环
limit.each();
limit.forin([1,2,3],function(i,j){console.log(i,j)});   //1 "0" 2 "1" 3 "2"

判断两个值是否相等  
limit.is();
limit.is(null,null);  //true  当两个值都是null/undefined/true/false/相同的对象或数值，都是+0/-0的情况是相等的

把任意多个的源对象自身的可枚举属性拷贝给目标对象，并返回目标对象
limit.assign();
limit.assign({},[1,2,3]);   //Object {0: 1, 1: 2, 2: 3}

返回一个包含指定对象所有的可枚举属性值的数组
limit.values();
limit.values({a:1,b:2,c:3});   //[1, 2, 3]

返回一个所有元素为键值对的数组
limit.entries();
limit.entries({a:1,b:2,c:3});    //[[a:1],[b:2],[c:3]]

返回对象所有可枚举自身属性的属性名的字符串数组
limit.keys();
limit.keys({a:1,b:2,c:3});   //["a", "b", "c"]

返回对象的所有属性，包括不可枚举的
limit.keysSuper();
//getFoo是不可枚举属性
var my_obj = Object.create({},{getFoo:{value:function(){return this.foo}}});
my_obj.foo = 1;
limit.keysSuper(my_obj);  //["getFoo", "foo"]

把任意多个的源对象自身的可枚举属性拷贝给目标对象，并返回目标对象，过滤掉未定义的属性
limit.assignSuper();
limit.assignSuper({},{a:1,b:2,c:undefined});  //Object {a: 1, b: 2}

扩展对象的属性,会改变原有的对象
limit.extend();
var obj = {a:1,b:2,c:3};
limit.extend(obj,{d:4,e:5});   //Object {a: 1, b: 2, c: 3, d: 4, e: 5}

扩展对象的属性，并过滤未定义的属性
limit.extendSuper();
limit.extendSuper({},{a:1,b:undefined});  //Object {a: 1}

返回对象中的值，会自动忽略不在对象中的参数
limit.getValueInObject();
limit.getValueInObject({a: {b: 'b1'}}, 'a', 'b', 'c');   //"b1"

返回对象的长度
limit.size();
limit.size({a:1,b:2,c:3});  //3

扩展对象的属性，与extend的用法相反
limit.stack();
limit.stack({a: 'a1', b: 'b1'},{a: null});   //Object {a: null, b: "b1"}

传入的对象必须是数组
limit.toArray();
limit.toArray([1,2,3]);   //[1, 2, 3]

判断一个值是否包含在arr或者obj中
limit.contains();
limit.contains({a:1,b:2,c:3},1);  //true

把所传入的数组展开变成一个数组
limit.flatten();
limit.flatten([1,2,[3,4,[5,6]]]);   //[1,2,3,4,5,6]

数组去重
limit.union();
limit.union([1,1,2,3,4,5,3,2]);  //[1, 2, 3, 4, 5]

白名单：过滤出数组中包含指定对象的数据,返回一个数组
limit.whiteList();
limit.whiteList([{a:1,a1:2,a2:3},{b:1,b1:2,b2:3}],{a1:2});   // [{a:1, a1:2, a2:3}]

黑名单：过滤出数组中不包含指定对象的数据,返回一个数组
limit.blackList();
limit.blackList([{a:1,a1:2,a2:3},{b:1,b1:2,b2:3}],{a1:2});    //[{b:1,b1:2,b2:3}]

返回当前数组中与指定值不同的数据，支持obj
limit.difference();
limit.difference([1,2,3,4],2);  //[1, 3, 4]

判断是否移除当前对象中指定的值
limit.remove();
var a = [1,2,3,4,5,2,3,4];
limit.remove(a,2,5);  //true a = [1, 2, 3, 4, 5, 3, 4]

移除当前对象中所有指定的值，并返回移除后的对象
limit.removeAll();
var a = [1,2,3,4,5,2,3,4];
limit.removeAll(a,3);   // [1, 2, 4, 5, 2, 4]

返回数组或者类数组对象中的第一个属性值
limit.first();
limit.first({a:1,b:2,c:3});  //1

返回数组或者类数组对象中的最后一个属性值
limit.last();
limit.last({a:1,b:2,c:3});   //3

向数组的末尾添加一个或多个元素，不改变原有的数组
limit.push();
var a = [];
var b = limit.push(a,1,2,3,4);   //a = []   b = [1,2,3,4]

删除数组的最后一个元素，并返回删除后的数组,不改变原有的数组
limit.pop();
var a = [1,2,3,4];
var b = limit.pop(a);  //a = []   b = [1,2,3]

向数组的开头添加一个或多个元素，不改变原有的数组
limit.unshift();
var a = [1,2];
var b = limit.unshift(a,3,4);   //a = []   b = [3, 4, 1, 2]

删除数组的第一个元素，并返回删除后的数组，不改变原有的数组
limit.shift();
var a = [1,2];
var b = limit.shift(a);   //a = []   b = [2]

颠倒数组中的元素顺序，不改变原有的数组
limit.reverse();
var a = [1,2,3,4,5];
var b = limit.reverse(a);   //a = []  b = [5, 4, 3, 2, 1]

对数组中的元素进行排序，不改变原有的数组
limit.sort();
var a = [3,4,51,34,56,532];
var b = limit.sort(a);   //a = []  b = [3, 34, 4, 51, 532, 56]

向/从数组中添加/删除指定位置的元素，不改变原有的数组
limit.splice();
var a = [1,2,3,4,5];
删除元素
var b = limit.splice(a,1,3);   //a = []  b = [1, 5]
添加元素
var b = limit.splice(a,1,3,'5555');  //a = []  b = [1, "5555", 5]

将数组中的元素放入字符串里，并可以指定分隔符，不改变原有的数组
limit.join();
var a = [1,2,3,4,5];
var b = limit.join(a,':');   //a = []  b = "1:2:3:4:5"

连接两个或多个数组，返回一个新数组，不改变原有的数组
limit.concat();
var a = [1,2,3,4,5];
var a1 = [6,7,8,9];
var b = limit.concat(a,a1);   //a = []  b = [1, 2, 3, 4, 5, 6, 7, 8, 9]]

从数组中选出指定的元素，不改变原有的数组
limit.slice();
var a = [1,2,3,4,5];
var b = limit.slice(a,1,4);   //a = []  b = [2, 3, 4]

数组或obj中的每一项都执行一次给定的函数
limit.forEach();
limit.forEach([1,2,3,4,5],function(i,j){console.log('a['+j+']='+i)});   //a[0]=1  a[1]=2  a[2]=3  a[3]=4  a[4]=5

数组或obj中的每一项都执行一次给定的函数,并返回新数组
limit.map();
var r = [1,2,3,4];
var newr = limit.map(r,Math.sqrt);    //[1, 1.4142135623730951, 1.7320508075688772, 2]

数组或obj中的每一项都执行一次给定的函数,并返回通过的元素
limit.filter();
limit.filter([1,2,3,4,5],function(ele,index){return ele>3});  //[4, 5]

数组或obj中的每一项都执行一次给定的函数,检测到符合条件的元素才会返回，后面的将不再执行
limit.some();
limit.some([1,2,3,4,5],function(ele,index){return ele>3});   //true

数组或obj中的每一项都执行一次给定的函数,检测到不符合的元素就会返回，后面的将不再执行
limit.every();
limit.every([1,2,3,4,5],function(ele,index){return ele>3});   //false

返回指定元素在数组或obj中的第一个位置
limit.indexOf();
limit.indexOf([1,2,3,4,2,3,4],2);  //1

返回指定元素在数组或obj中的位置,严格检测数组中的元素
limit.indexOfSuper();
limit.indexOfSuper([1,2,3,4,5,0],-0);   //-1

与indexof相反
limit.lastIndexOf();
limit.lastIndexOf([1,2,3,4,5,4,3,2,1],3);   //6

数组中的每一个元素从左到右开始合并累加，返回累加之后的值
limit.reduce();
limit.reduce([1,2,3,4,5],function(ele,index){return ele+index});   // 15

数组中的每一个元素从左到右开始合并累加，返回累加之后的值
limit.reduceRight();
limit.reduceRight([1,2,3,4,5],function(ele,index){return ele+index});  // 15

用于将对象转换为真正的数组
limit.from();
limit.from({'0':'a','1':'b','2':'c',length:3});   //["a", "b", "c"]

返回参数值组成的数组
limit.of();
limit.of([1,2,3,4],3);  //[Array[4], 3]

返回数组或者obj中满足条件的元素
limit.find();
limit.find([1,2,3,4,5],function(ele,index){return ele>3});   // 4

返回数组或者obj中满足条件的元素的索引值
limit.findIndex();
limit.findIndex([1,2,3,4,5],function(ele,index){return ele>3});  // 3

将数组中某个区间的元素替换成指定值
limit.fill();
limit.fill([1,2,3,4,5],6,1,4);   //[1, 6, 6, 6, 5]

判断当前数组是否包含指定的值
limit.includes();
limit.includes([1,2,3,4,5],3);  //true

在数组内部将指定位置的元素复制到其他位置，会覆盖原有的元素
limit.copyWithin();
limit.copyWithin([1,2,3,4,5],3,0,2);   //[1, 2, 3, 1, 2]

传入的对象转换成String类型
limit.toString();
limit.toString(1111);   //"1111"

去除首尾的空格
limit.trim();
limit.trim(' html ');   //"html"

反编译处理4个字节存储的字符
limit.codePointAt();
limit.codePointAt(1);   //49

编译
limit.fromfromCodePoint();
limit.fromfromCodePoint(49);   //"1"

将原字符串重复指定的次数，返回一个新的字符串
limit.repeat();
limit.repeat('a',3);  //"aaa"

字符串补全长度的功能,头部补全
limit.padStart();
limit.padStart('a',3);    //"  a"

字符串补全长度的功能，尾部补全
limit.padEnd();
limit.padEnd('a',2);   //"a "

参数字符串是否在源字符串的头部中,第三个参数表示从指定位置开始到结束
limit.startsWith();
limit.startsWith('hello world!','hello',5);    //false

参数字符串是否在源字符串的尾部中，第三个参数表示前指定的多少个字符中查找
limit.endsWith();
limit.endsWith('hello kitty!','hello',5);  //true

传入的对象转换成number类型
limit.toNumber();
limit.toNumber('aaa');   //NaN

返回一个随机的整数
limit.random();
limit.random(2.1);   // 2

千分位分隔符
limit.thousandSeparator();
limit.thousandSeparator(1111);   //"1,111.00"

数字字符串转换成number
limit.unThousandSeparator();
limit.unThousandSeparator('1111');   //1111

小数点偏移的位置
limit.toFixed();
limit.toFixed(1,2);   //"1.00"

加法运算
limit.plus();
limit.plus(1,2,3,3);   //9

减法运算
limit.minus(); 
limit.minus(1,2,3);   //-4

乘法运算
limit.multiply();
limit.multiply(1,2);  //2

除法运算
limit.except();
limit.except(1,2);  //0.5

四则运算
limit.express();
limit.express(1+2+3*4/2);  //9

返回一个日期
limit.formatDate();
limit.formatDate();   //"2016-09-26 09:24:40"




