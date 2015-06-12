var deleteUrl = "test1Rpc/delete.json";
var addUrl = "test1Rpc/add.json";
$("table a").click(function(){
    var curId = $(this).attr("bizId");
    $.ajax({
		url:deleteUrl,
		data:{
			id:curId
		},
		success:function(msg){
			location.reload(true);
		}
	});
});
$("#add").click(function(){
	$.ajax({
		url:addUrl,
		data:{
			testVo:JSON.stringify(getTestVo())
		},
		beforeSend:function(xhr){
			var testVo = getTestVo();
			if(testVo.testName==null || testVo.testName==""){
        		alert("name can not be null.");
        		return false;
        	}else if(testVo.testCount==null || testVo.testCount==""){
        		alert("count can not be null.");
        		return false;
        	}else if(!/[0-9]+/.test(testVo.testCount)){
				alert("count must be a Numeric.");
        		return false;
			}
		},
		success:function(msg){
			if(msg.hasError){
				alert(msg.errors[0].field);
			}else{
				location.reload(true);
			}
		},
		error:function(msg){
			alert(msg);
		}
	});
});

function getTestVo(){
	var name = $("#name").val();
	var count = $("#count").val();
	var testVo = {
		testName:name,
		testCount:count
	}
	return testVo;
}