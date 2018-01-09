
import './style.less';

import VideoStream from './videoStream';
import Button from 'modules/button/index';
import Ajax from 'modules/ajax/index';
import Component from 'common/myReflux/component';
import DialogWidget from 'modules/dialog/widget';

class VideoCamera extends Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className={me.getClassName('page-video-camera')}>
				<video autoPlay="autoplay" ref="video" width={props.width} height={props.height}></video>
				<div className="fn-MT10">
					<Button value="截 图" onClick={me.doScreenshots.bind(me)} />
				</div>
				{do{
					if( props.isShots ){
						<canvas ref="canvas" className="fn-hide"></canvas>
					}
				}}
			</div>
		);
	}
	componentDidMount(){
		let me = this;
		let {refs: {video}} = me;
		new VideoStream().then((stream) => {
			console.log(stream)
			window.myStream = stream;
			video.src = URL.createObjectURL(stream);
		});
	}
	doScreenshots(){
		let me = this;
		return Actions(me).screenshots(true).then(() => {
			return me.drawImg();
		}).then((base64) => {
			return new Ajax({
				url: '/common/database64.json',
				type: 'post',
				data: {
					database: base64
				}
			});
		}).then((val) => {
			DialogWidget.success('保存成功');
		}).catch(e => limit.err(e));
	}
	drawImg(){
		let me = this;
		let {refs: {canvas, video}, props: {width, height}} = me;
		let cxt = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;
		cxt.scale( width/video.videoWidth, height/video.videoHeight );
		cxt.drawImage(video, 0, 0);
		return canvas.toDataURL();
	}
	componentDidUpdate(){
		
	}
	componentWillUnmount(){
		
	}
};

export default VideoCamera;

