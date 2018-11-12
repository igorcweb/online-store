import React from 'react';
import spinner from '../images/spinner.gif';

export default () => {
  return (
    <div className="content">
      <img
        src={spinner}
        style={{ width: '100px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};
