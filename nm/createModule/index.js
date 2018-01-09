"use strict";

// 依赖
const fs = require('fs');
const templatePageHtml = require('./template/entry/html');

const templatePageMap = {
	'controller.js': require('./template/entry/controller'),
	'index.js': require('./template/entry/index'),
	'main.js': require('./template/entry/main'),
	'style.less': require('./template/entry/style'),
	'view.js': require('./template/entry/view')
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

function deleteParentFolder(path){
	let pathList = path.split('/').filter(v => v);
	pathList.pop();
	let thePath = pathList.join('/');
	if( fs.existsSync(thePath) ){
		let files = fs.readdirSync(thePath);
		if( !files.length ){
			fs.rmdirSync(thePath);
			return deleteParentFolder(thePath);
		};
	};
};

function creatMkdir(pathList, path = []){
	path.push( pathList.shift() );
	let thePath = path.join('/');
	if( !fs.existsSync(thePath) ){
        fs.mkdirSync(thePath);
    };
    if( pathList.length ){
    	return creatMkdir(pathList, path);
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

function resetName(name){
	return name.split('/').filter(v => v).join('/');
};

function forMateName(name){
	return name.replace(/\/(\w)/g, (a, b) => {return b.toLocaleUpperCase();})
};

// aaBbCc => aa-bb-cc
function getLessName(val){
	val = forMateName(val);
	return val
		.replace( /([a-z])([A-Z])/g, (a, b, c) => {return `${b}-${c.toLocaleLowerCase()}`} )
		.toLocaleLowerCase();
};
// aaBbCc => AaBbCc
function getComponentName(val){
	val = forMateName(val);
	return val
		.replace( /\w/, a => a.toLocaleUpperCase() );
};

function getHtmlName(name){
	let arr = name.split('/');
	arr.pop();
	return arr;
};

function entryInit(name){
	let html = templatePageHtml(name);
	name = resetName(name);
	let path = `src/js/entry/${name}/`;
	let lessName = getLessName(name);
	let componentName = getComponentName(name);
	creatMkdir( path.split('/').filter(v => v) );
	creatMkdir( getHtmlName(`html/${name}`) );
	let promiseArr = ['controller.js', 'index.js', 'main.js', 'style.less', 'view.js'].map((val) => {
		return promiseWrite(`${path}${val}`, templatePageMap[val](lessName, componentName) );
	});
	promiseArr.push( promiseWrite(`html/${name}.html`, html) );
	Promise.all(promiseArr).then(() => {
		console.log('entry init success');
	}, (e) => {
		console.log('错误', e);
	});
};

function entryRemove(name){
	name = resetName(name);
	// 删除文件
	deleteFolder(`html/${name}.html`);
	deleteParentFolder( `html/${name}` );
	let path = `src/js/entry/${name}`;
	deleteFolder(path);
	deleteParentFolder(path);
	console.log('entry remove success');
};

function modInit(name){
	name = resetName(name);
	let path = `src/js/modules/${name}/`;
	let lessName = getLessName(name);
	let componentName = getComponentName(name);
	creatMkdir( path.split('/').filter(v => v) );
	let promiseArr = ['controller.js', 'index.js', 'widget.js', 'style.less', 'view.js'].map((val) => {
		return promiseWrite(`${path}${val}`, templateModMap[val](lessName, componentName) );
	});
	Promise.all(promiseArr).then(() => {
		console.log('mod init success');
	}, (e) => {
		console.log('错误', e);
	});
};

function modRemove(name){
	name = resetName(name);
	// 删除文件夹
	let path = `src/js/modules/${name}`;
	deleteFolder(path);
	deleteParentFolder(path);
	console.log('mod remove success');
};

function pageInit(name){
	name = resetName(name);
	let path = `src/js/bus/${name}/`;
	let lessName = getLessName(name);
	let componentName = getComponentName(name);
	creatMkdir( path.split('/').filter(v => v) );
	let promiseArr = ['controller.js', 'index.js', 'style.less', 'view.js'].map((val) => {
		return promiseWrite(`${path}${val}`, templatePageMap[val](lessName, componentName) );
	});
	Promise.all(promiseArr).then(() => {
		console.log('page init success');
	}, (e) => {
		console.log('错误', e);
	});
};

function pageRemove(name){
	name = resetName(name);
	// 删除文件夹
	let path = `src/js/bus/${name}`;
	deleteFolder(path);
	deleteParentFolder(path);
	console.log('mod remove success');
};

// 是否是需要的类型
function isNeedType(type){
	return ['entry', 'mod', 'page'].indexOf(type) === -1;
};
// 存在已经存在
function isInFiles(type, name){
	let path = null;
	switch( type ){
   		case 'entry': path = `src/js/entry/${name}`; break;
   		case 'page': path = `src/js/bus/${name}`; break;
	    case 'mod': path = `src/js/modules/${name}`; break;
	};
	return fs.existsSync(path);
};

exports.createModule = function(type, name, cover){
	if( isNeedType(type) ){
        return console.log('需要类型,必须是["entry", "mode", "page"]之一');
    };
    if( !name ){
        return console.log('需要文件名称');
    };
    if( !cover && isInFiles(type, name) ){
    	return console.log('文件已经存在,如果需要覆盖确保第三个参数为true');
    };	
    switch( type ){
   		case 'entry': return entryInit(name);
   		case 'page': return pageInit(name);
	    case 'mod': return modInit(name);
	};
};

exports.removeModule = function(type, name){
	switch( type ){
   		case 'entry': return entryRemove(name);
   		case 'page': return pageRemove(name);
	    case 'mod': return modRemove(name);
	};
};




























