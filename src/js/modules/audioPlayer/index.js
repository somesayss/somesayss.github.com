"use strict";
/**
 * version:0.1.4
 * 参考
 * http://www.epooll.com/archives/422/
 * 0.1.1
 * 	自适应布局
 * 0.1.2
 * 	增加点击定位
 * 0.1.3
 * 	移动的球定位到中心
 * 0.1.4
 * 	音量的BUG
 * 	可用video和audio
 */

import './style.less';

const $ = require('$');

class AudioPlayer extends React.Component {
	static defaultProps = {
		loop: true,
		autoPlay: true,
		muted: false,
		width: 400,
		audioWidth: '100%',
		audioHeight: '32',
		volumeWidth: 50,
		progressWidth: 90,
		timeWidth: 60,
		type: 'vido'
	}
	state = {
		playStatus: 'stop',
		muteStatus: 'nomute',
		totleTime: 0,
		thisTime: 0,
		volume: 1,
		error: true
	}
	constructor(){
		super(...arguments);
		let me = this;
		let {state, props} = me;
		state.muteStatus = props.muted ? 'mute': 'nomute';
	}
	render(){
		let me = this;
		let {props, state} = me;
		return (
			<div className="audio-player" style={{width: props.width}}>
				{do{
					if( props.type === 'audio' ){
						<audio src={props.src} width="100%" ref="audio" loop={props.loop} autoPlay={props.autoPlay} muted={props.muted}></audio>
					}else{
						<video src={props.src} width="100%" ref="audio" loop={props.loop} autoPlay={props.autoPlay} muted={props.muted}></video>
					}
				}}
				{do{
					if(state.error){
						<div className="mark"></div>
					}
				}}
				<table width={props.audioWidth} height={props.audioHeight}>
					<tbody>
						<tr>
							<td width="40">
								{me.renderToggle()}
							</td>
							<td width={props.timeWidth}>
								<span className="show-time" style={ {width: `${props.timeWidth}px`} }>
									{me.parseSecond(state.thisTime)} / {me.parseSecond(state.totleTime)}
								</span>
							</td>
							<td>
								<span className="ctr-progress" ref="progress" data-target="progress" onClick={me.changeBar.bind(me, 'music')}>
									<span className="ch-light" style={ {width: `${me.computeBarLeft() + 6}px`} }></span>
									<i className="ctr-bar" onMouseDown={me.moveBar.bind(me, 'music')}
										onClick={me.stopClick}
										style={ {left: `${me.computeBarLeft()}px`} }></i>
								</span>
							</td>
							<td width="40">
								{me.renderMute()}
							</td>
							<td width={props.volumeWidth + 10}>
								<span className="ctr-volume-progress" data-target="progress" onClick={me.changeBar.bind(me, 'volume')}>
									<span className="ch-light" style={ {width: `${me.computeVolBarLeft() + 6}px`} }></span>
									<i className="ctr-bar" onMouseDown={me.moveBar.bind(me, 'volume')} 
										onClick={me.stopClick}
										style={ {left: `${me.computeVolBarLeft()}px`} }></i>
								</span>
							</td>
							<td width="10"> </td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
	renderToggle(){
		let me = this;
		let {state, props} = me;
		return (
			<div>
				{do{
					if( state.playStatus === 'stop' ){
						<i className="btn-switch btn-stop" onClick={state.error ? null : me.changePlayStatus.bind(me, 'start')}></i>
					}else{
						<i className="btn-switch btn-start" onClick={state.error ? null : me.changePlayStatus.bind(me, 'stop')}></i>
					}
				}}
			</div>
		);
	}
	renderMute(){
		let me = this;
		let {state, props} = me;
		return (
			<span className="ctr-speaker-box">
				{do{
					if( state.muteStatus === 'mute' || state.volume === 0 ){
						<span className="ctr-speaker ctr-mute" onClick={me.muteAudio.bind(me, 'nomute')}>
							<i className="ch-img1"></i>
							<i className="ch-img2"></i>
						</span>
					}else{
						<span className="ctr-speaker" onClick={me.muteAudio.bind(me, 'mute')}>
							<i className="ch-img1"></i>
							<i className="ch-img2"></i>
						</span>
					}
				}}
			</span>
		);
	}
	computeBarLeft(){
		let me = this;
		let {state, props, refs} = me;
		let {progress} = refs;
		if( progress ){
			return progress.offsetWidth * state.thisTime / state.totleTime - 6;
		}else{
			return -6;
		};
	}
	computeVolBarLeft(){
		let me = this;
		let {state, props} = me;
		if( state.muteStatus === 'mute' ){
			return -6;
		}else{
			return props.volumeWidth * state.volume - 6;
		};
	}
	componentDidMount(){
		let me = this;
		let {refs} = me;
		let {audio} = refs;
		me.audio = audio;
		// 绑定事件
		['canplay', 'playing', 'pause', 'volumechange'].forEach((val) => {
			audio[`on${val}`] = me[`audio${val.replace(/\w/, (s) => s.toUpperCase() )}`].bind(me);
		});
		window.audioEx = audio;
	}
	componentWillReceiveProps(){
		let me = this;
		me.shouldNotUpdate = true;
	}
	shouldComponentUpdate(){
		let me = this;
		let shouldNotUpdate = me.shouldNotUpdate;
		if( shouldNotUpdate ){
			me.shouldNotUpdate = false;
		};
		return !shouldNotUpdate;
	}
	changeBar(key, e){
		let me = this;
		let target = e.target;
		let thisTarget = $(target).closest('[data-target="progress"]');
		let tarWidth = thisTarget.width();
		let thisX =  e.clientX - thisTarget.offset().left;
		let scale = thisX/tarWidth;
		if(key === 'volume'){
			me.changeVolume(scale);
		};
		if( key === 'music' ){
			me.changeMusic(scale);
		};
	}
	stopClick(e){
		e.preventDefault();
		e.stopPropagation();
	}
	/**
	 * 移动球的时候控制 volume
	 * 点击禁音是偶控制 muted
	 */
	// 移动球 DOM操作
	moveBar(key, e){
		let me = this;
		let {audio, props} = me;
		let target = e.target;
		let tarWidth = target.offsetWidth;
		let parent = target.parentNode;
		let parWidth = parent.offsetWidth;
		let mouseOffsetX = e.clientX;
		let barLeft = parseInt( target.style.left || 0 );
		let min = 0;
		let max = parWidth;
		let isPaused = audio.paused;
		let scale = null;
		if( key === 'music'){
			if( !isPaused ){
				me.isMoveBar = true;
				audio.pause();
			};
		};

		document.onmousemove = function(e){
			e.preventDefault();
			e.stopPropagation();
			let diffX = e.clientX - mouseOffsetX;
			let thisX = barLeft + diffX + 6;
			if( thisX < min ){
				thisX = min;
			}else if( thisX > max ){
				thisX = max;
			}
			scale = thisX/max;
			if(key === 'volume'){
				me.changeVolume(scale);
			};
			if( key === 'music' ){
				me.changeMusic(scale);
			};
		};
		document.onmouseup = function(e){
			e.preventDefault();
			e.stopPropagation();
			document.onmousemove = document.onmouseup = null;
			if( key === 'music'){
				if( !isPaused ){
					delete me.isMoveBar;
					if( scale !== 1 ){
						audio.play();
					}else{
						if( props.loop ){
							audio.play();
						}else{
							me.audioPause();
						};
					};
				};
			};
		};
	}
	// 开始暂停音乐
	changePlayStatus(key){
		let me = this;
		let {audio} = me;
		if( key === 'start' ){
			audio.play();
		}else{
			audio.pause();
		};
	}
	// 改变音轨
	changeMusic(val){
		let me = this;
		let {audio, state} = me;
		state.thisTime = audio.currentTime = val * state.totleTime;
		me.setState(state);
	}
	// 改变音量
	changeVolume(val){
		let me = this;
		let {audio, state} = me;
		audio.volume = +val.toFixed(2);
		if( audio.volume ){
			audio.muted = false;
		};
	}
	// 音量变化
	audioVolumechange(){
		let me = this;
		let {state, audio} = me;
		state.volume = audio.volume;
		state.muteStatus = audio.muted ? 'mute': 'nomute';
		me.setState(state);
	}
	// 禁音
	muteAudio(key){
		let me = this;
		let {audio, state} = me;
		if( key === 'mute' ){
			audio.muted = true;
		}else{
			audio.muted = false;
		};
	}
	// 暂停
	audioPause(){
		let me = this;
		let {state} = me;
		clearInterval(me.timeoutId);
		if( !me.isMoveBar ){
			state.playStatus = 'stop';
		};
		me.setState(state);
	}
	// 播放中
	audioPlaying(){
		let me = this;
		let {state, audio} = me;
		state.playStatus = 'start';
		delete me.musicEnd;
		clearInterval(me.timeoutId);
		me.timeoutId = setInterval(function(){
			let state = me.state;
			state.thisTime = audio.currentTime;
			me.setState(state);
		}, 1000);
		me.setState(state);
	}
	// 音频准备就绪
	audioCanplay(){
		let me = this;
		let {state, audio, props} = me;
		state.error = false;
		state.totleTime = audio.duration;
		me.changeVolume(state.volume);
		me.setState(state);
	}
	// 事件转换 把秒格式化为分
	parseSecond(second){
		let min = Math.floor( second / 60 );
		let sec = Math.floor( second % 60 );
		sec = `00${sec}`.slice(-2);
		return `${min}:${sec}`;
	}
}

module.exports = AudioPlayer;