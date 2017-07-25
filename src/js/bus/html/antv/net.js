module.exports = () => {

  var canvas = new G6.Canvas({
    containerId: 'c1',
    width: 600,
    height: 600
  });
  canvas.scale(0.5, 0.5);
  canvas.addShape('line', {
    attrs: {
      x1: 20,
      y1: 20,
      x2: 280,
      y2: 280,
      stroke: 'red'                       // 颜色名字
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 20,
      y1: 300 + 20,
      x2: 280,
      y2: 300 + 280,
      arrow: true,                                             // 显示箭头
      stroke: '#00ff00'                   // 6位十六进制
    }
  });
  canvas.addShape('line', {
    attrs: {
      x2: 300 + 20,
      y2: 300 + 20,
      x1: 300 + 280,
      y1: 300 + 280,
      arrow: true,                                             // 显示箭头
      stroke: '#00f'                      // 3位十六进制
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 20,
      y1: 600 + 20,
      x2: 280,
      y2: 600 + 280,
      lineDash: [10,10],
      stroke: 'rgb(100, 100, 200)'         // rgb数字模式
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 300 + 20,
      y1: 600 + 20,
      x2: 300 + 280,
      y2: 600 + 280,
      lineDash: [10,20, 10],
      stroke: 'rgba(100, 100, 200, 0.5)'   // rgba数字模式
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 600 + 20,
      y1: 600 + 20,
      x2: 600 + 280,
      y2: 600 + 280,
      lineDash: [50,50],
      stroke: 'rgb(34%, 85%, 48%)'         // rgb百分比模式
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 900 + 20,
      y1: 600 + 20,
      x2: 900 + 280,
      y2: 600 + 280,
      lineDash: [50,5,50,5],
      stroke: 'rgba(34%, 85%, 48%, 0.5)'   // rgba百分比模式
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 20,
      y1: 900 + 20,
      x2: 280,
      y2: 900 + 280,
      stroke: 'l (0) 0:#ff0000 1:#0000ff'                      // 线性渐变
    }
  });
  canvas.addShape('line', {
    attrs: {
      x1: 300 + 20,
      y1: 900 + 20,
      x2: 300 + 280,
      y2: 900 + 280,
      stroke: 'r (0.5, 0.5, 0) 0:rgb(0, 0, 255) 1:#ff0000'    // 迳向渐变
    }
  });
  canvas.draw();

};





























