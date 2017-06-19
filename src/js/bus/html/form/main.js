"use strict";

// 依赖
const $ = require('$');
const limit = require('limit');
const Upload = require('modules/upload/index');

$('#fileUpload').on('click', () => {
	new Upload({
		element: document.getElementById('form'),
		onprogress(e){
			limit.log( limit['*'](e, 100) + '%');
		}
	}).submit().then((e) => {
		limit.log(e);
	}, (e) => {
		limit.err(e);
	});
});

