/**
 * budget脚本主入口
 * 2014,12,02
 */
;(function($, angular, WIN, DOC){

	var app = angular.module('myApp', [], function(){
		console.log('RUN!!');
	});
	app.controller('budgetCtrl', function($scope){
		//变量
		//数据源
		var budgetData = [];

		//函数
		function totlePay(budgetLists){
			var sum = 0;
			//计算总金额
			budgetLists.lists.forEach(function(v, i){
				if(v.needCount){
					sum += +v.pay;
				}
			});
			budgetLists.total = sum;
		}

		//作用域
		//新增一个分类
		$scope.creatSort = function(){
			budgetData.push({
				'title': '未命名',
				'sortEdit': '',
				'lists': [{
					'status': '未完成',
					'name': '',
					'intro': '',
					'pay': '',
					'needCount': true,
					'listEdit': 'bu-edit'
				}],
				'total': 0,
				'choseAll': true
			});
		}
		//修改分类名称
		$scope.editSortTitle = function(budgetLists){
			budgetLists.sortEdit = 'bu-edit';
		}
		//保存分类民称 
		$scope.saveSortTitle = function(budgetLists){
			budgetLists.sortEdit = '';
		}
		//创建条目
		$scope.creatList = function(list){
			list.push({
				'status': '未完成',
				'name': '',
				'intro': '',
				'pay': '',
				'needCount': true,
				'listEdit': 'bu-edit'
			});
		}
		//删除条目
		$scope.deleteList = function(list, index, budgetLists){
			list.splice(index, 1);
			totlePay(budgetLists);
			if(list.length === 0){
				budgetData.splice(budgetData.indexOf(budgetLists), 1);
			}
		}
		//修改条目
		$scope.editList = function(list){
			list.listEdit = 'bu-edit';
		}
		//保存条目
		$scope.saveList = function(list, budgetLists){
			list.listEdit = '';
			totlePay(budgetLists);
		}
		//选中全部
		$scope.checkAll = function(choseAll, lists, budgetLists){
			if(choseAll){
				lists.forEach(function(v, i){
					v.needCount = true;
				});
			}else{
				lists.forEach(function(v, i){
					v.needCount = false;
				});
			}
			totlePay(budgetLists);
		}
		//选择单个
		$scope.checkOne = function(budgetLists){
			totlePay(budgetLists);
		}
		//数据源
		$scope.budgetData = budgetData;
		$scope.statusList = ['未完成', '已完成'];

	});

})(jQuery, angular, window, document);









