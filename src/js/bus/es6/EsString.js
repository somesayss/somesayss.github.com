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
	var EsString = React.createClass({displayName: "EsString",
		render: function(){
			var me = this,
				props = me.props;
			return (
				React.createElement("div", null, 
					React.createElement(Template, {title: props.title, attr: "Unicode"}, 
						"unicode用双字节的形式表达超出\\uFFFF之外的字符，转义的方法：", 
						React.createElement(Code, null,  parseUnicode+''), 
						'比如可以将 \\u20BB7 => \\uD842\\uDFB7 或者 \\u64321 => \\uD950\\uDF21', " ", React.createElement("br", null), 
						"转义的参考 ", React.createElement("a", {href: "http://blog.csdn.net/thl789/article/details/7506133", className: "fn-link-blue", target: "_blank"}, "点这里"), " ", React.createElement("br", null), 
						"unicode查询 ", React.createElement("a", {href: "https://zh.m.wikibooks.org/wiki/Unicode/D000-DFFF", className: "fn-link-blue", target: "_blank"}, "点这里"), " ", React.createElement("br", null), 
						"字符串长度的的BUG ", React.createElement("br", null), 
						"随意找个超过 0xFFFF 的字符", 
						React.createElement(Code, null, 
							"'𠀋'.length //2"
						), 
						"正确获取字符串长度应该这样写", 
						React.createElement(Code, null,  stringSize+'')
					), 
					React.createElement(Template, {title: props.title, attr: "codePointAt()"}, 
						"正确获取超过0xFFFF之外的字符的code", 
						React.createElement(Code, null, 
							"'𠀋'.charCodeAt(0).toString(16); //d840 ", React.createElement("br", null), 
							"'𠀋'.charCodeAt(1).toString(16); //dc0b ", React.createElement("br", null), 
							"'𠀋'.codePointAt(0).toString(16); //2000b ", React.createElement("br", null)
						), 
						"可以用刚才写的 parseUnicode 函数验证", 
						React.createElement(Code, null, 
							"parseUnicode('2000b') //[\"D840\", \"DC00B]"
						)
					), 
					React.createElement(Template, {title: props.title, attr: "String.fromCodePoint()"}, 
						"codePointAt的反义版", 
						React.createElement(Code, null, 
							"String.fromCodePoint(0x2000b) //𠀋"
						)
					), 
					React.createElement(Template, {title: props.title, attr: "at()", disabled: "true"}), 
					React.createElement(Template, {title: props.title, attr: "normalize()"}
						
					)
				)
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

console.log( parseUnicode('20000') );

// 真确获取长度
function stringSize(str){
	return str.replace(/[\uD800-\uDFFF]{2}/g, '1').length;
};

	return EsString;

});


// 等宽字体 http://tool.oschina.net/commons?type=8