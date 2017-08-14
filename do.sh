#!/bin/bash

echo -e "1.GIT打包上传[git]\n2.创建页面[page]\n3.创建模块[mod]"
echo -n "输入你想要的操作:"
read type

gitDO(){

	echo -n "输入注释:"
	read commit
	[ ! $commit ] && commit="add"
	echo -n "输入分支(默认是master):"
	read master
	[ ! $master ] && master="master"
	git add -A
	git commit -m $commit
	git push origin $master;
}

${type}DO