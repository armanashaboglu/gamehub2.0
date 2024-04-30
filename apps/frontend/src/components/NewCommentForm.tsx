import React, { useState, useEffect } from 'react';

const NewCommentForm = ({ discussionId, parentCommentId }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [author, setAuthor] = useState({ id: '', username: '' });

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch(`/api/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();

                if (response.ok) {
                    setAuthor({ id: data._id, username: data.username });
                } else {
                    setError('Error fetching user information');
                }
            } catch (error) {
                setError('Error fetching user information');
            }
        };

        fetchCurrentUser();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/discussions/${discussionId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ content, parentComment: parentCommentId, author: author })
            });

            const data = await response.json();

            if (response.ok) {
                setContent('');
            } else {
                setError(data.message || 'Error posting comment');
            }
        } catch (error) {
            setError('Error posting comment');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment..."
                required
                className='p-2'
            />
            <button type="submit">Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default NewCommentForm;
