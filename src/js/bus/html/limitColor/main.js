"use strict";

// 依赖
const $ = require('$');
const Rainbow = require('modules/color/index');


let html = '';
let arr = new Rainbow({totle: 10});
arr.forEach((val) => {
	html += `<p style="background:rgb(${val.join(',')});height:10px;"></p>`;
});
// C.getColorRange(10, [255, 122, 0], [255, 255, 0]).forEach((val) => {
// 	html += `<p style="background:rgb(${val.join(',')});height:10px;"></p>`;
// });

$('body').html(html);


// window.onfocus = function(){
// 	alert(123)
// }
