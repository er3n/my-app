import React from 'react';
import NewTodoContainer from './NewTodoContainer';
import TodoListContainer from './TodoListContainer';

const mainContainerStyle = {
  background: 'grey',
  display: 'flex',
  flexDirection: 'column',
};

export default class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: ['first todo', 'second todo', 'third todo'],
    };
  }

  onAddTodo = todo => {
    const todos = this.state.todos;
    todos.push(todo);
    this.setState({
      todos: todos,
    });
    console.log(todos);
  };

  deleteTodo = id => {
    const todos = this.state.todos;
    todos.splice(id, 1);
    this.setState({
      todos: todos,
    });
  };

  render() {
    return (
      <div style={mainContainerStyle}>
        <NewTodoContainer onClick={this.onAddTodo} />
        <TodoListContainer
          todos={this.state.todos}
          onClickDelete={this.deleteTodo}
        />
      </div>
    );
  }
}
