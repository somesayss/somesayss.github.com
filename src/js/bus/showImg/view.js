

import './style.less';

import Component from 'common/myReflux/component';

const imgShow = require('../../../imgs/tutu.jpg');
const imgShow1 = require('../../../imgs/abc/map123.jpg');

const {Button} = antd;

class ShowImg extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-showImg')}>
				<div className="imgshow1"></div>
				<div className="imgshow2"></div>
				<div className="imgshow3"></div>
				<div className="imgshow4"></div>
				<img src={imgShow} />
				<img src={imgShow1} />
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

