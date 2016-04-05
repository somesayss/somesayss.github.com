"use strict";
/**
 * 业务
 */
define(function(require, exports, module) {

	// 依赖
	const React = require('react'),
		Code = require('./code'),
		limit = require('limit'),
		Template = require('./template');

	// 类
	let EsLanguage = React.createClass({
		render: function(){
			let me = this,
				props = me.props;
			return (
				<div>
					<Template title={props.title} attr="const  & let">
						<Code>
							const a = 'a1'; ==> var a = 'a1' <br />
							let b = 'b1'; ==> var b = 'b1'
						</Code>
					</Template>
					<Template title={props.title} attr="对象的定义">
						<Code>
							let O = {'{ fn(){}, a: "a2" }'} ==> var  O = {'{fn: function(){}, a: "a1"}'}
						</Code>
					</Template>
					<Template title={props.title} attr="字符串模板">
						<Code>
							let a = 'a1';<br />
							console.log( `my name is ${'{c}'} haha` ); // my name is a1 haha
						</Code>
					</Template>
					<Template title={props.title} attr="解构">
						<Code>
							let [a, b] = ['a1', 'b1']; ==> var a = 'a1', b = 'b1'; <br />
							let {'{a, b}'} = {'{"a": "a1", "b": "b1"}'}; <br />
							==> <br />
							var o = {'{"a": "a1", "b": "b1"}'}; <br />
							var a = o.a, b = o.b;
						</Code>
					</Template>
					<Template title={props.title} attr="类">
						<Code>
							class A {'{'}  constructor(name){'{'} this.name = name; {'}'} show(){'{'} console.log(this.name);{'}'} static xixi(){'{'} console.log('xixi'); {'}'} {'}'}; <br />
							class B extends A {'{'}  constructor(name, age){'{'}  super(name); this.age = age; {'}'} show(){'{'}  super.show(); console.log(this.age); {'}'} {'}'};
						</Code>
					</Template>
					<Template title={props.title} attr="默认参数">
						<Code>
							function person(name = 'kiss', age = 19){'{'} console.log(name, age); {'}'};
						</Code>
					</Template>
					<Template title={props.title} attr="不定参数">
						<Code>
							let arr = ['i1', 'i2', 'i3']; <br />
							let arrCopy = [...arr]; <br />
							function per(){'{'}  console.log(arguments); {'}'} ; <br />
							per(...arr);
						</Code>
					</Template>
					<Template title={props.title} attr="箭头函数">
						<Code>
							let fn1 = (a, b) => a + b; <br />
							let fn2 = (a, b) => {'{'} return a + b {'}'}; <br />
							let fn3 = a => a;
						</Code>
					</Template>
				</div>
			);
		}
	});

	return EsLanguage;

});