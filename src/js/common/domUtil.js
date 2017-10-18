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

const DOC = document;

const isIE8 = domUtil.isIE8 = () => {
	return DOC.documentMode === 8;
};

// 是否是IE老的版本，现在定义的是IE8
domUtil.isIEOld = (defaultVal, iEOldVal) => {
	if( isIE8() ){
		return iEOldVal;
	}else{
		return defaultVal;
	};
};

domUtil.clearDom = (node) => {
	let clearDiv = document.createElement('div');
	clearDiv.appendChild(node);
	clearDiv.innerHTML = '';
	clearDiv = null;
};

export default domUtil;

