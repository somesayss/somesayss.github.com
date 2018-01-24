
const FormRules = {
	// 纯数字
	number(rule, value, success){
		if( /^\d+$/.test(value) ){
			success();
		}else{
			success(false);
		};
	}
};

export default FormRules;

