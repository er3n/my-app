import React from 'react';

const headerStyle = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: '15px',
};

function Caption(props) {
  return <h1 style={headerStyle}>{props.children}</h1>;
}

export default Caption;
