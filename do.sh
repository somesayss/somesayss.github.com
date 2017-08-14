#!/bin/bash

echo -e '1.GIT打包上传[git]\n2.创建页面[page]\n3.创建模块[mod]'
echo -n '输入你想要的操作:'
read type

gitDO(){
	git add -A
	git commit -m 'add'
}

${type}DO