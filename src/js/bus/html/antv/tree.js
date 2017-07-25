module.exports = (data) => {

	const tree = new G6.Tree({
		  id: 'c1',            // 容器ID
		  animate: false,
		  // layoutFn: G6.Layout.Dendrogram,
		  height: 450,         // 画布高
		  fitView: 'lc', // 自动缩放
		  showButton: true, // 是否显示开关
		  layoutCfg: {
		    direction: 'LR', // 方向（LR/RL/H/TB/BT/V）
		    getHGap: function(/* d */) { // 横向间距
		      return 30;
		    },
		    getVGap: function(/* d */) { // 竖向间距
		      return 12;
		    },
		  },
		  modes: {
		  		default: [
	            	'dragCanvas', 'collapse', 'spreadout', 'buttonPointer'
	          	]
		  }
	});
	tree.source(data);

	G6.registNode('customHtml', {
	  getHtml: function(node){
	  	let origin = node.origin;
	  	let INFO = '';
	  	if( origin.type === 'info' ){
	  		INFO = `<div style="line-height:20px;background:#FFF;color:#666;">
	  			${origin.info}
	  		</div>
	  		<div style="line-height:20px;background:#EEE;;color:#666;padding:0 5px;">
	  			${origin.link}
	  		</div>`;
	  	};
	    let DOM = G6.Util.createDOM(`<div style="border-radius:3px;overflow:hidden;">
	    	<div>${origin.label||origin.name||''}</div>
	    	${INFO}
	    </div>`);
	    return DOM;
	  }
	}, 'html');

	// 节点
	tree.node().shape('customHtml').style((node) => {
		let height = 30;
		let width = 120;
		if( node.type === 'info' ){
			height = 72;
		};
		return {
			width: width,
			height: height,
			lineWidth: 1,
			radius: 10,
			stroke: '#333',
			fill: '#259af3',
			color: '#FFF',
			fillOpacity: 1,
			lineHeight: '30px',
			textAlign: 'center'
		}
	});
	// 线
	tree.edge().shape('HVH').style({
		stroke: '#666'
	});
	tree.render();

	// 事件
	tree.on('click', (e) => {
		console.log(e);
	});

	// 后期追加的节点
	setTimeout(() => {
		return;
		tree.add('a12', {
			label: 'a121'
		});
		let line = tree.get('canvas').addShape('line', {
		    attrs: {
	    		x1: 20,
  				y1: 20,
		      	x2: 20,
		      	y2: 20,
		      	lineDash: [2],
		      	arrow: true,                                             // 显示箭头
		      	stroke: 'red'                       // 颜色名字
		    }
	  	});
		line.animate({
			x1: 20,
			y1: 20,
		    x2: 280,
	      	y2: 280,
	      	stroke: 'red'
		}, 1000, 'easeInOutQuart');
		tree.get('canvas').draw();

	}, 1000);


	console.log(tree);
	

	// var canvas = new G6.Canvas({
	//     containerId: 'c1',
	//     width: 600,
	//     height: 600
	//   });
	//   canvas.scale(0.5, 0.5);
	//   canvas.addShape('line', {
	//     attrs: {
	//       x1: 20,
	//       y1: 20,
	//       x2: 280,
	//       y2: 280,
	//       stroke: 'red'                       // 颜色名字
	//     }
	//   });
	//   canvas.draw();

};





























