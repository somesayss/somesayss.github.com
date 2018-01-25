

import './style.less';

import Component from 'common/myReflux/component';

const imgShow = require('../../../imgs/tutu.jpg');

const {Button} = antd;

class ShowImg extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-showImg')}>
				<div className="imgshow1"></div>
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

export default ShowImg;

