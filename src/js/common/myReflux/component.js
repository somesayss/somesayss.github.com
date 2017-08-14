
class Component extends React.Component {
	getClassName(...classNameArr){
		let me = this;
		let {props} = me;
		let {className} = props;
		classNameArr.push(className);
		return classNameArr.filter(limit.K).join(' ');
	}
};

module.exports = Component;