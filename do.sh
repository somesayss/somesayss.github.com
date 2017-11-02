#!/bin/bash

echo -e "1.打包上传[git]\n2.创建页面[page]\n3.创建模块[mod]\n4.创建入口[entry]\n5.启动webpack服务[webpack]\n6.编译[build]\n7.服务[server]"
echo -n "输入你想要的操作:"
read type

if [[ $type -le 7 && $type -ge 1 ]]; then
	doArr=(other git page mod entry webpack build server)
	type=${doArr[type]}
fi

gitDO(){
	branch=`git symbolic-ref --short -q HEAD`
	echo -n "输入注释(默认是add):"
	read commit
	[ ! $commit ] && commit="add"
	echo "当前分支是${branch}开始打包推送"
	gulp --build
	node_modules/.bin/webpack --config ./config/buildConfig.js
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
		echo -n "是否覆盖[true|false]:"
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
		echo -n "是否覆盖[true|false]:"
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
		echo -n "是否覆盖[true|false]:"
		read isoverwrite
		node mm/$init entry $entryName $isoverwrite
	else
		node mm/$init entry $entryName
	fi
}

webpackDO(){
	gulp
	node_modules/.bin/webpack-dev-server --config ./config/serverConfig.js --hot
}

buildDO(){
	gulp --build
	node_modules/.bin/webpack --config ./config/buildConfig.js
}

serverDO(){
	echo -n "端口号:(默认3000):"
	read port
	[ ! $port ] && port="3000"
	gulp --build
	node_modules/.bin/webpack --config ./config/buildConfig.js
	anywhere $port
}

${type}DO






















