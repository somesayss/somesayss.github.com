module.exports = (lessName, componentName) => {
	return `
import './style.less';

import Component from 'common/myReflux/component';

class ${componentName} extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-${lessName}')}>
				page${componentName}
			</div>
		);
	}
	componentDidMount(){

	}
	componentDidUpdate(){

	}
	componentWillUnmount(){
		
	}
};

export default ${componentName};

`;
};
