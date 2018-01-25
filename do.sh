#!/bin/bash

echo -e "1.打包上传[git]\n2.创建页面[page]\n3.创建模块[mod]\n4.创建入口[entry]\n5.启动webpack服务[webpack]\n6.编译[build]\n7.服务[server]\n8.上线上传[online]"
echo -n "输入你想要的操作:"
read type

if [[ $type -le 7 && $type -ge 1 ]]; then
	doArr=(other git page mod entry webpack build server online)
	type=${doArr[type]}
fi

gitDO(){
	branch=`git symbolic-ref --short -q HEAD`
	echo -n "输入注释(默认是add):"
	read commit
	[ ! $commit ] && commit="add"
	echo "当前分支是${branch}开始打包推送"
	gulp --build
	gulp lessAfter
	node_modules/.bin/webpack --config ./config/onDaily.js
	gulp assets
	git add -A
	git commit -m $commit
	git push origin $branch
}

pageDO(){
	echo -n "初始化还是删除[init|remove](默认init):"
	read init
	[ ! $init ] && init="init"
	echo -n "输入名称:"
	read pagename
	if [ $init == "init" ]; then
		echo -n "是否覆盖[false|true](默认false):"
		read isoverwrite
		node mm/$init page $pagename $isoverwrite
	else
		node mm/$init page $pagename
	fi
}

modDO(){
	echo -n "初始化还是删除[init|remove](默认init):"
	read init
	[ ! $init ] && init="init"
	echo -n "输入名称:"
	read modame
	if [ $init == "init" ]; then
		echo -n "是否覆盖[false|true](默认false):"
		read isoverwrite
		node mm/$init mod $modame $isoverwrite
	else
		node mm/$init mod $modame
	fi
}

entryDO(){
	echo -n "初始化还是删除[init|remove](默认init):"
	read init
	[ ! $init ] && init="init"
	echo -n "输入名称:"
	read entryName
	if [ $init == "init" ]; then
		echo -n "是否覆盖[false|true](默认false):"
		read isoverwrite
		node mm/$init entry $entryName $isoverwrite
	else
		node mm/$init entry $entryName
	fi
}

webpackDO(){
	echo -n "是否要开启https[false|true](默认false):"
	read isHttps
	[ $isHttps ] && isHttps="--https"
	gulp
	gulp assets
	node_modules/.bin/webpack-dev-server --config ./config/serverConfig.js --hot $isHttps
}

buildDO(){
	gulp --build
	gulp lessAfter
	node_modules/.bin/webpack --config ./config/buildConfig.js
}

serverDO(){
	echo -n "端口号:(默认3030):"
	read port
	[ ! $port ] && port="3030"
	gulp --build
	gulp lessAfter
	node_modules/.bin/webpack --config ./config/buildConfig.js
	gulp assets
	anywhere $port
}

onlineDO(){
	branch=`git symbolic-ref --short -q HEAD`
	echo -n "输入注释(默认是add):"
	read commit
	[ ! $commit ] && commit="add"
	echo "当前分支是${branch}开始打包推送"
	gulp --build
	gulp lessAfter
	node_modules/.bin/webpack --config ./config/onLine.js
	gulp assets
	git add -A
	git commit -m $commit
	git push origin $branch
}

${type}DO






















