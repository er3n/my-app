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
      todos: [
        {
          id: Date.now(),
          text: 'My first todo',
          isCompleted: false,
        },
      ],
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
    const newTodos = todos.filter(item => item.id !== id);
    this.setState({
      todos: newTodos,
    });
  };

  changeTodoStatus = (id, isComplete) => {
    const todos = this.state.todos;
    const newTodos = todos.map(item => {
      if (item.id === id) {
        item.isCompleted = isComplete;
      }
      return item;
    });
    this.setState({
      todos: newTodos,
    });
  };

  render() {
    return (
      <div style={mainContainerStyle}>
        <NewTodoContainer onClick={this.onAddTodo} />
        <TodoListContainer
          todos={this.state.todos}
          onClickDelete={this.deleteTodo}
          onClickChangeStatus={this.changeTodoStatus}
        />
      </div>
    );
  }
}
