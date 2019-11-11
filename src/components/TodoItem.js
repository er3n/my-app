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

const completedStyle = {
  textDecorationLine: 'line-through',
};

function TodoItem(props) {
  return (
    <div style={todoItemStyle}>
      {!props.todo.isCompleted && (
        <button
          style={todoButtonStyle}
          type='button'
          onClick={() => props.onClickChangeStatus(props.todo.id, true)}
        >
          Complete
        </button>
      )}
      {props.todo.isCompleted && (
        <button
          style={todoButtonStyle}
          type='button'
          onClick={() => props.onClickChangeStatus(props.todo.id, false)}
        >
          Redo
        </button>
      )}
      <button
        style={todoButtonStyle}
        type='button'
        onClick={() => props.onClickDelete(props.todo.id)}
      >
        Delete
      </button>
      {!props.todo.isCompleted && <div>{props.todo.text}</div>}
      {props.todo.isCompleted && (
        <div style={completedStyle}>{props.todo.text}</div>
      )}
    </div>
  );
}

export default TodoItem;
