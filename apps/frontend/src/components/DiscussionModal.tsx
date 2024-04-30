import React, { useState } from 'react';

const DiscussionModal = ({ onClose, user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/discussions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content, author: user })
            });

            const data = await response.json();

            if (response.ok) {
                onClose();
            } else {
                setError(data.message || 'Error creating discussion');
            }
        } catch (error) {
            setError('Error creating discussion');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                <h2>Create a Discussion</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='title'>Title:</label>
                        <input type="text" value={title} className="p-2 border border-gray-300" onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor='content'>Content:</label>
                        <textarea value={content} className="p-2 border border-gray-300" onChange={(e) => setContent(e.target.value)} required></textarea>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default DiscussionModal;
