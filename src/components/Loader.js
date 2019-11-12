import React from 'react';

function Loader(props) {
  return (
    <div>
      {props.isLoading && 'Loading...'}
      {!props.isLoading && props.children}
    </div>
  );
}

export default Loader;
