import React from 'react';

export default () => {
  return (
    <div className="app">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100vh',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <i className="fa fa-spinner fa-spin fa-5x" />
        <h4>Loading... Please Wait...</h4>
      </div>
    </div>
  );
};
