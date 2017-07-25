const { createStore, combineReducers } = Redux;

// Action

const ADD_TODO = 'ADD_TODO';
const DEL_TODO = 'DEL_TODO';

function addTodo(value){
	return {
		type: ADD_TODO,
		value
	};
};

function delTodo(value){
	return {
		type: DEL_TODO,
		value
	};
};

// Reducer
function todos( state = {}, action ){
	console.log('state', state);
	switch( action.type ){
		case ADD_TODO: 
			return {...state, ...{addValue: action.value}};
		case DEL_TODO: 
			return {...state, ...{delValue: action.value}};
		default: 
			return state;
	};
};

const todoApp = combineReducers({todos});

// Store
const store = createStore(todoApp);

window.doSome = function(value){
	store.dispatch( addTodo(value) )
};

window.doSome1 = function(value){
	store.dispatch( delTodo(value) )
};

// console.log(store.dispatch({type: 'ADD_TODO'}))

// React
class Title extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		console.log(props);
		return (
			<div>
				abced {props.todos.addValue} {props.todos.delValue}
			</div>
		);
	}
};

// function Title(props){
// 	return (
// 		<div>
// 			abced {props.todos.text}
// 		</div>
// 	);
// };

function render(){
	ReactDOM.render(
		<Title {...store.getState()} />, 
		document.getElementById('container')
	);	
};

render();
store.subscribe(render);

























