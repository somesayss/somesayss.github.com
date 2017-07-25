"use strict";

const domUtil = {};

// 选择input或者textarea
domUtil.textSelect = (input, start, end) => {
	if( input.setSelectionRange ){
		input.setSelectionRange(start, end);
		input.focus();
	}else if( input.createTextRange ){
		let range = input.createTextRange();         
		range.moveStart("character", start);
		range.moveEnd("character",end);
		if( start === end ){
			range.collapse(true);
		};
		range.select();
	};
};


module.exports = domUtil;

