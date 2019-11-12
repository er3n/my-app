import React from 'react';
import NewTodoContainer from './NewTodoContainer';
import TodoListContainer from './TodoListContainer';
import {
  getTodos,
  addTodo,
  deleteTodo,
  completeTodo,
  redoTodo,
} from '../api/todos-api';
import Loader from './Loader';

const mainContainerStyle = {
  background: 'grey',
  display: 'flex',
  flexDirection: 'column',
};

export default class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = () => {
    getTodos().then(res => {
      this.setState({
        todos: res.data,
        isLoading: false,
      });
    });
  };

  onAddTodo = todo => {
    addTodo(todo).then(() => {
      this.loadTodos();
    });
  };

  onDeleteTodo = id => {
    deleteTodo(id).then(() => {
      this.loadTodos();
    });
  };

  changeTodoStatus = (id, isComplete) => {
    let completeTodoResolve;
    if (isComplete) {
      completeTodoResolve = completeTodo(id);
    } else {
      completeTodoResolve = redoTodo(id);
    }
    completeTodoResolve.then(() => {
      this.loadTodos();
    });
  };

  render() {
    return (
      <Loader isLoading={this.state.isLoading}>
        <div style={mainContainerStyle}>
          <NewTodoContainer onClick={this.onAddTodo} />
          <TodoListContainer
            todos={this.state.todos}
            onClickDelete={this.onDeleteTodo}
            onClickChangeStatus={this.changeTodoStatus}
          />
        </div>
      </Loader>
    );
  }
}
