"use strict";
/**
 * 业务
 */

define(function (require, exports, module) {

	// 依赖
	var $ = require('$'),
	    Event = require('events'),
	    limit = require('limit');

	var Seed = React.createClass({
		displayName: 'Seed',

		render: function render() {
			return React.createElement(
				'div',
				null,
				'2234'
			);
		}
	});

	// 子节点
	var Child = React.createClass({
		displayName: 'Child',

		getDefaultProps: function getDefaultProps() {
			return {
				testString: "a",
				testBoolean: true,
				testFunction: function testFunction() {},
				testNumber: 1,
				testArray: [],
				testArrayOf: ["a1", "a2"],
				testObject: {},
				testObjectOf: { a: "a1" },
				testOneOf: "a1",
				testOneOfType: "a1",
				testAny: 1,
				testElement: React.createElement(Seed, null),
				testNode: [React.createElement(Seed, null)], // 1 "a" undefined null false <Seed /> [...]
				testInstanceOf: new String("a"),
				testShape: {
					string: "a1",
					number: 123
				},
				other: "a2" //
			};
		},
		propTypes: {
			testString: React.PropTypes.string,
			testBoolean: React.PropTypes.bool,
			testFunction: React.PropTypes.func,
			testNumber: React.PropTypes.number,
			testArray: React.PropTypes.array,
			testArrayOf: React.PropTypes.arrayOf(React.PropTypes.string),
			testObject: React.PropTypes.object,
			testObjectOf: React.PropTypes.objectOf(React.PropTypes.string),
			testOneOf: React.PropTypes.oneOf(["a1", "a2"]),
			testOneOfType: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
			testAny: React.PropTypes.any,
			testElement: React.PropTypes.element,
			testNode: React.PropTypes.node,
			testInstanceOf: React.PropTypes.instanceOf(String),
			testShape: React.PropTypes.shape({
				string: React.PropTypes.string,
				number: React.PropTypes.number
			}),
			other: function other(props, propName, componentName) {
				if (props[propName] !== "a1") {
					return new Error("error");
				}
			}
		},
		render: function render() {
			return React.createElement(
				'div',
				{ onClick: this.clickHandler },
				'点我 ',
				this.props.content
			);
		}
	});

	// 置入文档
	ReactDOM.render(React.createElement(Child, null), document.getElementById('search'));
});
