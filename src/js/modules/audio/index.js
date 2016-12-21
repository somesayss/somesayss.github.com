"use strict";

// 参考 http://www.cnblogs.com/Wayou/p/3543577.html

// 依赖
const limit = require('limit');

class Audio{
	props = {
		fftSize: 128
		,changeArray: limit.K
	}
	state = {}
	stream = null //媒体流
	analyser = null //解析器
	frameId = null //定时器ID
	constructor(config){
		let me = this
		limit.assignSuper(me.state, me.props, config);
	}
	start(){
		let me = this;
		me.frameId = requestAnimationFrame(me.getArrayByAnalyser.bind(me));
	}
	stop(){
		let me = this;
		cancelAnimationFrame(me.frameId);
	}
	getArrayByAnalyser(){
		let me = this;
		let state = me.state;
		let count = me.analyser.frequencyBinCount;
		let array = new Uint8Array(count);
		me.analyser.getByteFrequencyData(array);
		state.changeArray.call(me, array);
		me.frameId = requestAnimationFrame(me.getArrayByAnalyser.bind(me));
	}
	getAnalyserByStream(){
		let me = this;
		let state = me.state;
		return me.getAudioContext().then((audioContext) => {
			let media = audioContext.createMediaStreamSource(me.stream);
			let analyser = audioContext.createAnalyser();
			analyser.fftSize = state.fftSize;
			media.connect(analyser);
			me.analyser = analyser;
		});
	}
	getAudioContext(){
		return new Promise((resolve, reject) => {
			let AudioContext = window.AudioContext;
			if( AudioContext ){
				resolve(new AudioContext());
			}else{
				reject('can not found AudioContext');
			};
		});
	}
	getUserMediaStream(){
		return new Promise((resolve, reject) => {
			let NAV = navigator;
			let getMedia = NAV.getUserMedia || NAV.webkitGetUserMedia || NAV.mozGetUserMedia || NAV.msGetUserMedia;
			if( getMedia ){
				getMedia.call(NAV, {audio: true}, (stream) => {
					resolve(stream);
				}, (e) => {
					reject(e);
				})
			}else{
				reject('can not found getMedia');
			};                
		});
	}
	getUserMediaArray(){
		let me = this;
		return me.getUserMediaStream().then((stream) => {
			console.log(stream);
			me.stream = stream;
			return me.getAnalyserByStream();
		}).catch((e) => {
			limit.err(e);
		});
	}
}

module.exports = Audio;