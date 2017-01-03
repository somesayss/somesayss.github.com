"use strict";

// 依赖
const $ = require('$');
const limit = require('limit');
const PaseBoard = require('modules/paseBoard/index');

$('#copy').on('click', () => {
	new PaseBoard( $('#list').html() );
});