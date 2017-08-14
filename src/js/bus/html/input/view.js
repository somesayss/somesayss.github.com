
import './style.less';

import Component from 'common/myReflux/component';

import InputText from 'modules/inputText/index';

class Input extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-input')}>
				<div className="fs12">12的字体</div>
				<div className="fs12rem">12的字体</div>
				<div className="fs14">14的字体</div>
				<div className="fs14rem">14的字体</div>
				<div className="fs16">16的字体</div>
				<div className="fs16rem">16的字体</div>
				<div className="fs18">18的字体</div>
				<div className="fs18rem">18的字体</div>
				<div className="width">
					哈喽
				</div>
			</div>
		);
	}
	componentDidMount(){
		
	}
	componentWillUnmount(){
		
	}
};

module.exports = Input;
