"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	var React = require('react'),
		Code = require('./code'),
		Template = require('./template');

	// 类
	var EsString = React.createClass({
		render: function(){
			var me = this,
				props = me.props;
			return (
				<div>
					<Template title={props.title} attr="Unicode">
						unicode用双字节的形式表达超出\uFFFF之外的字符，转义的方法：
						<Code>{ parseUnicode+'' }</Code>
						{'比如可以将 \\u20BB7 => \\uD842\\uDFB7 或者 \\u64321 => \\uD950\\uDF21'} <br />
						转义的参考 <a href="http://blog.csdn.net/thl789/article/details/7506133" className="fn-link-blue" target="_blank">点这里</a> <br />
						unicode查询 <a href="https://zh.m.wikibooks.org/wiki/Unicode/D000-DFFF" className="fn-link-blue" target="_blank">点这里</a> <br />
						字符串长度的的BUG <br />
						随意找个超过 0xFFFF 的字符
						<Code>
							'𠀀'.length //2
						</Code>
						正确获取字符串长度应该这样写
						<Code>{ stringSize+'' }</Code>
					</Template>
					<Template title={props.title} attr="codePointAt()">
						正确获取超过0xFFFF之外的字符的code
						<Code>
							'𠀀'.charCodeAt(0).toString(16); //d840 <br />
							'𠀀'.charCodeAt(1).toString(16); //dc00 <br />
							'𠀀'.codePointAt(0).toString(16); //20000 <br />
						</Code>
						可以用刚才写的 parseUnicode 函数验证
						<Code>
							parseUnicode('20000') //["D840", "DC00"]
						</Code>
					</Template>
					<Template title={props.title} attr="String.fromCodePoint()">
						codePointAt的反义版
						<Code>
							String.fromCodePoint(0x20000) //𠀀
						</Code>
					</Template>
					<Template title={props.title} attr="at()" disabled="true"></Template>
					<Template title={props.title} attr="normalize()">
						音标符可以这样写：
						<Code>
							'\u0061\u0300' //à	<br />
							'\u0300\u0061' //̀a
						</Code>
						上面那种是真确的，看起来也是有区别的 <br />
						normalize 可以合并相应的字符
						<Code>
							'\u0061\u0300'.normalize().charCodeAt(0).toString(16) //\u00E0
						</Code>
					</Template>
					<Template title={props.title} attr="includes()">
						<Code>
							'Hello ECMAScript 6.0'.includes('ECMA', 6);	//true <br />
							'Hello ECMAScript 6.0'.includes('ECMA', 7);	//false
						</Code>
					</Template>
					<Template title={props.title} attr="startsWith()">
						<Code>
							'Hello ECMAScript 6.0'.startsWith('ECMA', 6);	//true <br />
							'Hello ECMAScript 6.0'.startsWith('ECMA', 5);	//false
						</Code>
					</Template>
					<Template title={props.title} attr="endsWith()">
						<Code>
							'Hello ECMAScript 6.0'.endsWith('ECMA', 10);	//true <br />
							'Hello ECMAScript 6.0'.endsWith('ECMA', 11);	//false
						</Code>
					</Template>
					<Template title={props.title} attr="repeat()">
						重复字符串几次
						<Code>
							'hello'.repeat(2);	//hellohello
						</Code>
						比较完善的实现，应对各种情况
						<Code>
							{ stringRepear+'' }
						</Code>
					</Template>
					<Template title={props.title} attr="padStart()" disabled="true"></Template>
					<Template title={props.title} attr="padEnd()" disabled="true"></Template>
				</div>
			);
		}
	});


// \u{20BB7} => \uD842\uDFB7
// \u{64321} => \uD950\uDF21 
// 转义
function parseUnicode(str16){
	// 防御如果在 0xFFFF 内的不转义
	if( parseInt(str16, 16) <= 0xFFFF ) return [str16];
	// 1.原始长度减去0x10000
	var origin = parseInt(str16, 16) - 0x10000;
	// 获取高位和低位
	var originH = origin >> 10,
		originL = origin & 1023;
	// 获取转义后的高低位
	originH = (0xD800 | originH).toString(16).toUpperCase();
	originL = (0xDC00 | originL).toString(16).toUpperCase();
	return [originH, originL];
};

// 真确获取长度
function stringSize(str){
	return str.replace(/[\uD800-\uDFFF]{2}/g, '1').length;
};

// 重复字符
function stringRepear(str, num){
	// 取整 把非数字的格式化为0 整数的不便 小数取整 NaN格式化为0 Infinity格式化为0
	num = ~~num;
	// 如果是负数格式化为0
	num < 0 && (num = 0);
	// 初始化数组
	var arr = new Array(num),
		tem = [];
	// 正确的塞入值
	Array.prototype.push.apply(tem, arr);
	// 返回
	return tem.map(function(){ return str }).join('');
};


	return EsString;

});


// 等宽字体 http://tool.oschina.net/commons?type=8