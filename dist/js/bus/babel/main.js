!function(e){function t(n){if(o[n])return o[n].exports;var r=o[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var o={};return t.m=e,t.c=o,t.p="/dist/",t(0)}([function(e,t,o){e.exports=o(1)},function(e,t,o){function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":u(t))&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":u(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var c,u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},f=function s(e,t,o){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,t);if(void 0===n){var r=Object.getPrototypeOf(e);return null===r?void 0:s(r,t,o)}if("value"in n)return n.value;var i=n.get;if(void 0!==i)return i.call(o)},p=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}();c=function(e,t,o){function c(e){for(var t=arguments.length,o=Array(t>1?t-1:0),n=1;n<t;n++)o[n-1]=arguments[n];console.log(this,"x",o)}var u,s,y,b="a1",v="b1",h=(u={},a(u,"a1","a1"),a(u,"b",v),a(u,"aaa",function(){}),a(u,"bbb",function(){}),a(u,"ccc","ccc3"),u,{e1:"e11",e2:"e22",e3:"e33"}),d=(h.e1,h.e2,h.e3,function(){function e(t){i(this,e),this.store={a:"a1"},this.name=t}return p(e,[{key:"show",value:function(){console.log(this.name)}}],[{key:"xixi",value:function(){return"xixi"}}]),e}());d.a="a1";var g=function(e){function t(e,o){i(this,t);var r=n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return r.store={b:"b2"},r.age=o,r}return r(t,e),p(t,[{key:"show",value:function(){f(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"show",this).call(this),console.log(this.age)}}],[{key:"xixi",value:function(){return"xi1xi1"}}]),t}(d),O=new g("shao2",28);console.log(g.a,"i want"),O.show();var w=["i1","i2","i3"];[].concat(w);c.apply(void 0,w),(s="111",y=c).call.apply(y,[s].concat(w)),console.log(!0);var x=["a1","a2","a3"],m=Array.prototype,j=m.map,_=m.forEach;j.call(x,function(e,t){});var P=_.bind(x);P(function(e){console.log(e)});l({},b,v)}.call(t,o,t,e),!(void 0!==c&&(e.exports=c))}]);
//# sourceMappingURL=main.js.map