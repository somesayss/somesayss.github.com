"use strict";

class QrcodeImg extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div ref="qrcodeImg" className="qrcode-img"></div>
		);
	}
	componentDidMount(){
		let me = this;
		let {refs, props} = me;
		let {qrcodeImg} = refs;
		$(qrcodeImg).html('').qrcode({
			width: 80, 
		    height:80, 
		    text: props.src
		});
	}
	componentDidUpdate(){
		let me = this;
		return me.componentDidMount();	
	}
};

module.exports = QrcodeImg;
