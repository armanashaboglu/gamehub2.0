import React, { useState } from 'react';
import NewCommentForm from '../components/NewCommentForm';

const Comment = ({ comment, setSelectedComment }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);

    return (
        <li className="comment">
            <div className="comment-content">
                <p className="text-sm text-sky-700 tracking-wide">{comment.author.username}:</p>
                <p className="mt-1 flex flex-col gap-4">{comment.content}</p>
                <button className='mr-auto text-black-400 text-sm flex gap-1 items-center tracking-wide' onClick={() => {
                    setShowReplyForm(!showReplyForm);
                    setSelectedComment(comment._id);
                }}>Reply</button>
            </div>

            {comment.replies.length > 0 && (
                <ul className="replies border-l-gray-300 border-l-2 mb-2 pl-3 flex flex-col gap-3 py-1">
                    {comment.replies.map(reply => (
                        <Comment key={reply._id} comment={reply} setSelectedComment={setSelectedComment} />
                    ))}
                </ul>
            )}

            {showReplyForm && <NewCommentForm discussionId={comment.discussion} parentCommentId={comment._id} />}
        </li>
    );
};

export default Comment;

