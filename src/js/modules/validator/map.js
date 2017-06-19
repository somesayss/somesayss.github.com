"use strict";

const ValidatorMap = {};

// 必填
ValidatorMap.required = (val) => {
	return val !== '';
}
// 数字
ValidatorMap.number = (val) => {
	return /^\d*$/.test(val);
}
// 最小几个数字
ValidatorMap.min = (val, num) => {
	return val === '' || replaceEnter(val).length >= num;
}
// 最多几个数字
ValidatorMap.max = (val, num) => {
	return val === '' || replaceEnter(val).length <= num;
}

// 帮组：IE8 textarea \r\n换行导致字数计算有差错
const REX_ENTER = /\r/g; 
function replaceEnter(val){
	return val.replace(REX_ENTER, '');
};



module.exports = ValidatorMap;
















