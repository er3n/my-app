import React from 'react';

const headerStyle = {
  color: 'white',
  fontWeight: 'bold',
};

function Header(props) {
  return <h1 style={headerStyle}>{props.children}</h1>;
}

export default Header;
