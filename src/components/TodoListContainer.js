import React from 'react';
import Header from './Header';
import TodoItem from './TodoItem';

const todoListContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '40px',
};

export default class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={todoListContainerStyle}>
        <Header>Let's get some work done!</Header>
        {this.props.todos.map(item => (
          <TodoItem
            key={item.id}
            todo={item}
            onClickDelete={this.props.onClickDelete}
            onClickChangeStatus={this.props.onClickChangeStatus}
          />
        ))}
      </div>
    );
  }
}
