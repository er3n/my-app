import React from 'react';

const todoItemStyle = {
  display: 'flex',
  flexDirection: 'row',
  fontSize: '25px',
  color: 'white',
  padding: '10px 0',
};

const todoButtonStyle = {
  background: 'transparent',
  border: '1px white solid',
  borderRadius: '2px',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginRight: '10px',
};

function TodoItem(props) {
  return (
    <div style={todoItemStyle}>
      <button
        style={todoButtonStyle}
        type='button'
        onClick={() => props.onClickDelete(props.todo.id)}
      >
        Delete
      </button>
      <div>{props.todo.text}</div>
    </div>
  );
}

export default TodoItem;
