#!/bin/bash

echo -e "1.GIT打包上传[git]\n2.创建页面[page]\n3.创建模块[mod]"
echo -n "输入你想要的操作:"
read type

gitDO(){
	echo -n "输入注释(默认是add):"
	read commit
	[ ! $commit ] && commit="add"
	echo -n "输入分支(默认是master):"
	read master
	[ ! $master ] && master="master"
	gulp
	git add -A
	git commit -m $commit
	git push origin $master;
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
		node $init page $pagename $isoverwrite
	else
		node $init page $pagename
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
		node $init mod $modame $isoverwrite
	else
		node $init mod $modame
	fi
}

${type}DO