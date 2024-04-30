import React from 'react';
import Comment from '../components/Comment';

const CommentList = ({ comments, setSelectedComment }) => {
    return (
        <ul className="comment-list flex flex-row justify-between items-center mb-2">
            {comments.map(comment => (
                <Comment key={comment._id} comment={comment} setSelectedComment={setSelectedComment} />
            ))}
        </ul>
    );
};

export default CommentList;
