import React from 'react';
import Header from './Header';
import Caption from './Caption';

const newContainerStyle = {
  background: '#6799fc',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '40px',
};

const inputStyle = {
  width: '100vh',
  height: '40px',
  borderRadius: '15px',
  fontSize: '20px',
};

const addButtonStyle = {
  padding: '20px',
  background: 'transparent',
  border: '1px white solid',
  borderRadius: '10px',
  color: 'white',
  fontWeight: 'bold',
  marginTop: '15px',
  cursor: 'pointer',
};

export default class NewTodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
    };
  }

  onChangeNewTodo = e => {
    this.setState({
      newTodo: e.target.value,
    });
  };

  onClickAddTodo = () => {
    this.props.onClick({
      id: Date.now(),
      text: this.state.newTodo,
      isCompleted: false,
    });
    this.setState({
      newTodo: '',
    });
  };

  render() {
    return (
      <div style={newContainerStyle}>
        <Header>To-do App</Header>
        <Caption>Add new Todo</Caption>
        <div>
          <input
            type='text'
            style={inputStyle}
            value={this.state.newTodo}
            onChange={this.onChangeNewTodo}
          />
        </div>
        <div>
          <button
            style={addButtonStyle}
            onClick={this.onClickAddTodo}
            disabled={!this.state.newTodo}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}
