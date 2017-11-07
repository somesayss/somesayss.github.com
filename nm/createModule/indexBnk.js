"use strict";

// 依赖
const fs = require('fs');
const templatePageHtml = require('./template/page/html');

const templatePageMap = {
	'controller.js': require('./template/page/controller'),
	'index.js': require('./template/page/index'),
	'main.js': require('./template/page/main'),
	'style.less': require('./template/page/style'),
	'view.js': require('./template/page/view')
};

const templateModMap = {
	'controller.js': require('./template/mod/controller'),
	'index.js': require('./template/mod/index'),
	'widget.js': require('./template/mod/widget'),
	'style.less': require('./template/mod/style'),
	'view.js': require('./template/mod/view')
};

function deleteFolder(path){
	// 文件或者文件夹是否存在
	if( fs.existsSync(path) ){
		// 是为文件夹
		if( fs.statSync(path).isDirectory() ){
			let files = fs.readdirSync(path);
			files.forEach((val) => {
				return deleteFolder(`${path}/${val}`);
			});
			return fs.rmdirSync(path);
		}else{
			return fs.unlinkSync(path);
		};
	};
};

function promiseWrite(path, str){
	// console.log('我要的', path, str);
	return new Promise((s, j) => {
		fs.writeFile(path, str, (err) => {
			if(err){
				j(err);
			}else{
				s();
			};
		});
	});
};

// aaBbCc => aa-bb-cc
function getLessName(val){
	return val
		.replace( /([a-z])([A-Z])/g, (a, b, c) => {return `${b}-${c.toLocaleLowerCase()}`} )
		.toLocaleLowerCase();
};
// aaBbCc => AaBbCc
function getComponentName(val){
	return val
		.replace( /\w/, a => a.toLocaleUpperCase() );
};

function pageInit(name){
	let html = templatePageHtml(name);
	let path = `src/js/bus/html/${name}/`;
	let lessName = getLessName(name);
	let componentName = getComponentName(name);
	if( !fs.existsSync(path) ){
        fs.mkdirSync(path);
    };
	let promiseArr = ['controller.js', 'index.js', 'main.js', 'style.less', 'view.js'].map((val) => {
		return promiseWrite(`${path}${val}`, templatePageMap[val](lessName, componentName) );
	});
	promiseArr.push( promiseWrite(`html/${name}.html`, html) );
	Promise.all(promiseArr).then(() => {
		console.log('page init success');
	}, (e) => {
		console.log('错误', e);
	});
};

function pageRmove(name){
	// 删除文件
	deleteFolder(`html/${name}.html`)
	// 删除文件夹
	deleteFolder(`src/js/bus/html/${name}`);
	console.log('page remove success');
};

function modInit(name){
	let path = `src/js/modules/${name}/`;
	let lessName = getLessName(name);
	let componentName = getComponentName(name);
	if( !fs.existsSync(path) ){
        fs.mkdirSync(path);
    };
	let promiseArr = ['controller.js', 'index.js', 'widget.js', 'style.less', 'view.js'].map((val) => {
		return promiseWrite(`${path}${val}`, templateModMap[val](lessName, componentName) );
	});
	Promise.all(promiseArr).then(() => {
		console.log('mod init success');
	}, (e) => {
		console.log('错误', e);
	});
};

function modRmove(name){
	// 删除文件夹
	deleteFolder(`src/js/modules/${name}`);
	console.log('mod remove success');
};

// 是否是需要的类型
function isNeedType(type){
	return ['page', 'mod'].indexOf(type) === -1;
};
// 存在已经存在
function isInFiles(type, name){
	let path = null;
	switch( type ){
   		case 'page': path = `src/js/bus/html/${name}`; break;
	    case 'mod': path = `src/js/modules/${name}`; break;
	};
	return fs.existsSync(path);
};

exports.createModule = function(type, name, cover){
	if( isNeedType(type) ){
        return console.log('需要类型,必须是["page", "mode"]之一');
    };
    if( !name ){
        return console.log('需要文件名称');
    };
    if( !cover && isInFiles(type, name) ){
    	return console.log('文件已经存在,如果需要覆盖确保第三个参数为true');
    };	
    switch( type ){
   		case 'page': return pageInit(name);
	    case 'mod': return modInit(name);
	};
};

exports.removeModule = function(type, name){
	switch( type ){
   		case 'page': return pageRmove(name);
	    case 'mod': return modRmove(name);
	};
};




























