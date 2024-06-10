import React from 'react';
import './Comment.css';

function Comment({ text, date }) {
  return (
    <div className="comment">
      <p>{text}</p>
      <p className="comment-date">{date}</p>
    </div>
  );
}

export default Comment;
