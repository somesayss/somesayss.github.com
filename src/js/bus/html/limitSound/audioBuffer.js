"use strict";

// 依赖
const limit = require('limit');

class AudioBuffer {
	props = {
		element: null,
		radius: 200,
		url: './music.mp3',
		onLoad: limit.K,
		onError: limit.K,
		onAnalyser: limit.K,
		onProgress: limit.K,
		count: 720
	}
	state = {}
	AC = null
	audioBuffer = null
	constructor(config){
		let me = this;
		limit.assign(me.state, me.props, config);
		me.getAudioContext();
		me.getAudio().then((buffer) => {
			return me.getRealBuffer(buffer);
		}).then((buffer) => {
			me.audioBuffer = buffer;
			me.bindAudioWithBuffer()
		});
	}
	getAudio(){
		let me = this;
		let state = me.state;
		return new Promise((resolve, reject) => {
			let AJAX = new XMLHttpRequest();
			AJAX.open('GET', state.url);
			AJAX.responseType = 'arraybuffer';
			AJAX.onprogress = (e) => {
				let total = e.total || AJAX.getResponseHeader('Conent-Length');
				state.onProgress( limit(e.loaded / total, e.timeStamp).toFixed(2).val() );
			};
			AJAX.onload = (e) => {
				resolve(e.target.response);
				state.onLoad(e);
			};
			AJAX.onerror = (e) => {
				reject(e);
				state.onError(e);
			};
			AJAX.send(null);
		});
	}
	getAudioContext(){
		let me = this;
		let AC = new window.AudioContext();
		me.AC = AC;
	}
	creatAnalyser(){
		let me = this;
		let AC = me.AC;
		let analyser = AC.createAnalyser();
		let audioBufferSouceNode = AC.createBufferSource();
		return {analyser, audioBufferSouceNode};
	}
	getRealBuffer(buffer){
		let me = this;
		let AC = me.AC;
		return new Promise((resolve, reject) => {
			AC.decodeAudioData(buffer, resolve, reject);
		});
	}
	bindAudioWithBuffer(){
		let me = this;
		let CA = me.creatAnalyser();
		let analyser = CA.analyser
		let audioBufferSouceNode = CA.audioBufferSouceNode;
		audioBufferSouceNode.connect(analyser);
		analyser.connect(me.AC.destination);
		audioBufferSouceNode.buffer = me.audioBuffer;
		audioBufferSouceNode.loop = true;
		audioBufferSouceNode.start();
		me.analyser(analyser);
	}
	analyser(analyser){
		let me = this;
		let state = me.state;
		let array = new Uint8Array(state.count || analyser.frequencyBinCount);
	    analyser.getByteFrequencyData(array);
	    state.onAnalyser(array);
	    requestAnimationFrame(me.analyser.bind(me, analyser));
	}
};

module.exports = AudioBuffer;


















