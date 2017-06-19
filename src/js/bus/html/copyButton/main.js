"use strict";

// 依赖
const $ = require('$');
const limit = require('limit');
const Copy =require('modules/copy/index');

$('#copy').on('click', () => {
	new Copy({text: $('#list').html()});
});