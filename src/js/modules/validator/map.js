"use strict";

const Map = {};

// 必填
Map.required = (val) => {
	return val !== '';
}
// 数字
Map.number = (val) => {
	return /^\d*$/.test(val);
}
// 最小几个数字
Map.min = (val, num) => {
	return val === '' || replaceEnter(val).length >= num;
}
// 最多几个数字
Map.max = (val, num) => {
	return val === '' || replaceEnter(val).length <= num;
}

// 帮组：IE8 textarea \r\n换行导致字数计算有差错
const REX_ENTER = /\r/g; 
function replaceEnter(val){
	return val.replace(REX_ENTER, '');
};

export default Map;
















