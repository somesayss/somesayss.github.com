
class Component extends React.Component {
	getClassName(name = ''){
		let me = this;
		let {props} = me;
		let {className} = props;
		let classNameArr = [name];
		if( className ){
			classNameArr.push(className);
		};
		return classNameArr.join(' ');
	}
};

module.exports = Component;