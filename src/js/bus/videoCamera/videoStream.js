
class VideoStream extends limit.Events {
	props = {
		videoConfig: {
			 audio: true,
			 video: true
		}
	}
	constructor(){
		let me = super();
		let state = limit.assign(me.state, me.props);
		return new Promise((resolve, reject) => {
			me.getUserMedia().then((userMedia) => {
				return userMedia.call(navigator, state.videoConfig, resolve, reject);
			});
		});
	}
	getUserMedia(){
		return new Promise((resolve, reject) => {
			let getUserMedia = navigator.getUserMedia || 
				navigator.webkitGetUserMedia ||
		        navigator.mozGetUserMedia ||
		        navigator.msGetUserMedia;
		    if( getUserMedia ){
		    	resolve(getUserMedia);
		    }else{
		    	reject('getUserMedia is undefined');
		    };
		});
	}
};

export default VideoStream;
