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
import { getSocket } from '../api/ws/ws-config';

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

  onMessageReceived = socketMessage => {
    const message = JSON.parse(socketMessage.data);
    let todos = this.state.todos;
    // {"channel":"TodoAdded","body":{"id":1573556525269,"text":"asdasd","isCompleted":false}}
    // {"channel":"TodoRemoved","body":"1573556887938"}
    // {"channel":"TodoCompleted","body":"1573557531633"}
    if (message.channel === 'TodoAdded') {
      todos.push(message.body);
    } else if (message.channel === 'TodoRemoved') {
      todos = todos.filter(item => item.id != message.body);
    } else if (message.channel === 'TodoCompleted') {
      todos.forEach(item => {
        if (item.id == message.body) {
          item.isCompleted = true;
        }
      });
    } else if (message.channel === 'TodoRedo') {
      todos.forEach(item => {
        if (item.id == message.body) {
          item.isCompleted = false;
        }
      });
    } else {
      console.error('Unhandled Event');
    }
    this.setState({
      todos: todos,
    });
  };

  componentDidMount() {
    this.loadTodos();
    getSocket().onmessage = this.onMessageReceived;
  }

  loadTodos = () => {
    getTodos().then(res => {
      this.setState({
        todos: res.data,
        isLoading: false,
      });
    });
  };

  changeTodoStatus = (id, isComplete) => {
    if (isComplete) {
      completeTodo(id);
    } else {
      redoTodo(id);
    }
  };

  render() {
    return (
      <Loader isLoading={this.state.isLoading}>
        <div style={mainContainerStyle}>
          <NewTodoContainer onClick={addTodo} />
          <TodoListContainer
            todos={this.state.todos}
            onClickDelete={deleteTodo}
            onClickChangeStatus={this.changeTodoStatus}
          />
        </div>
      </Loader>
    );
  }
}
