!function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="/dist/",e(0)}([function(t,e,n){t.exports=n(2)},,function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var o=n(3),a=i(o),r=n(4),l=(i(r),n(5)),d=i(l);(0,a["default"])(d["default"])},function(t,e){"use strict";t.exports=function(t){var e=window.tree=new G6.Tree({id:"c1",animate:!1,height:600,fitView:"lc",showButton:!0,layoutCfg:{direction:"LR",getHGap:function(){return 30},getVGap:function(){return 12}},modes:{"default":["dragCanvas","collapse","spreadout","buttonPointer"]}});e.source(t),G6.registNode("customHtml",{getHtml:function(t){var e=t.origin,n="";"info"===e.type&&(n='<div style="line-height:20px;background:#FFF;color:#666;">\n\t  \t\t\t'+e.info+'\n\t  \t\t</div>\n\t  \t\t<div style="line-height:20px;background:#EEE;;color:#666;padding:0 5px;">\n\t  \t\t\t'+e.link+"\n\t  \t\t</div>");var i=G6.Util.createDOM('<div style="border-radius:3px;overflow:hidden;">\n\t    \t<div>'+(e.label||e.name||"")+"</div>\n\t    \t"+n+"\n\t    </div>");return i}},"html"),e.node().shape("customHtml").style(function(t){var e=30,n=120;return"info"===t.type&&(e=72),{width:n,height:e,lineWidth:1,radius:10,stroke:"#333",fill:"#259af3",color:"#FFF",fillOpacity:1,lineHeight:"30px",textAlign:"center"}}),e.edge().shape("HVH").style({stroke:"#666"}),e.render(),e.on("mouseEnter",function(t){console.log(t)}),setTimeout(function(){},1e3),console.log(e)}},function(t,e){"use strict";t.exports=function(){var t=new G6.Canvas({containerId:"c1",width:600,height:600});t.scale(.5,.5),t.addShape("line",{attrs:{x1:20,y1:20,x2:280,y2:280,stroke:"red"}}),t.addShape("line",{attrs:{x1:20,y1:320,x2:280,y2:580,arrow:!0,stroke:"#00ff00"}}),t.addShape("line",{attrs:{x2:320,y2:320,x1:580,y1:580,arrow:!0,stroke:"#00f"}}),t.addShape("line",{attrs:{x1:20,y1:620,x2:280,y2:880,lineDash:[10,10],stroke:"rgb(100, 100, 200)"}}),t.addShape("line",{attrs:{x1:320,y1:620,x2:580,y2:880,lineDash:[10,20,10],stroke:"rgba(100, 100, 200, 0.5)"}}),t.addShape("line",{attrs:{x1:620,y1:620,x2:880,y2:880,lineDash:[50,50],stroke:"rgb(34%, 85%, 48%)"}}),t.addShape("line",{attrs:{x1:920,y1:620,x2:1180,y2:880,lineDash:[50,5,50,5],stroke:"rgba(34%, 85%, 48%, 0.5)"}}),t.addShape("line",{attrs:{x1:20,y1:920,x2:280,y2:1180,stroke:"l (0) 0:#ff0000 1:#0000ff"}}),t.addShape("line",{attrs:{x1:320,y1:920,x2:580,y2:1180,stroke:"r (0.5, 0.5, 0) 0:rgb(0, 0, 255) 1:#ff0000"}}),t.draw()}},function(t,e){"use strict";t.exports={label:"应用名称",id:"a2",children:[{label:"模块名称",children:[{label:"modulesService",children:[{label:"领域",children:[{type:"info",name:"DommainServer",info:"百度",link:"http://www.baidu.com",children:[{type:"info",name:"DommainServer",info:"百度",link:"http://www.baidu.com"},{label:"lavaBo",id:"a1"},{label:"lavaBo"}]},{type:"info",name:"DommainServer",info:"百度",link:"http://www.baidu.com"},{type:"info",name:"Function",info:"百度",link:"http://www.baidu.com"},{type:"info",name:"Function",info:"百度",link:"http://www.baidu.com"}]},{label:"领域",id:"a3"},{type:"info",name:"Function",info:"百度",link:"http://www.baidu.com"}]},{label:"modulesService",children:[{label:"领域"},{label:"领域"},{type:"info",name:"Function",info:"淘宝",link:"http://www.taobao.com"}]}]},{label:"模块名称",children:[{},{}]}]}}]);
//# sourceMappingURL=main.js.map