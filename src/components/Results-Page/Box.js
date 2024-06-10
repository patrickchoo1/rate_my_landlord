import React from 'react';
import './Box.css';

const Box = ({ color, width, height, children }) => {
  return (
    <div className="box" style={{ backgroundColor: color, width: width, height: height }}>
      {children}
    </div>
  );
};

export default Box;