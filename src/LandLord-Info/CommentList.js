import React from 'react';
import Comment from './Comment';
import './CommentList.css';

function CommentList() {
    const comments = [
        {
            id: 1, text: "Okay landlords. Good maintenance services, but pictures" +
                "posted online are a bit deceiving.", date: "2023-05-04"
        },
        {
            id: 2, text: "Decent place for the price. Responsive landlords.", date: "2023-01-27"
        }
    ];

    return (
        <div className="comment-list">
            <h3>Renter Comments</h3>
            {comments.map(comment => (
                <Comment key={comment.id} text={comment.text} date={comment.date} />
            ))}
        </div>
    );
}


export default CommentList;