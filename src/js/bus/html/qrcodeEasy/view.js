"use strict";

import './style.less';

const Router = require('modules/router/index');

// 组件类
class QrcodeEasy extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className="qrcode-easy">
				<div ref="qrcode" className="qrcode-easy-main"></div>
				{do{
					if( props.info ){
						<div className="qrcode-easy-info">{props.info}</div>
					}
				}}
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		new Router({
			show(search){
				Actions(me).changeUrl(search);
			}
		})
	}
	componentDidUpdate(){
		let me = this;
		let {props, refs} = me;
		let {qrcode} = refs;
		$(qrcode).html('').qrcode({
			width: 200, 
		    height:200, 
		    text: props.url 
		});

	}
};

module.exports = QrcodeEasy;

