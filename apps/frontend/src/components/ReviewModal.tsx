import React, { useState } from 'react';

const ReviewModal = ({ onClose, user }) => {
    const [game, setGame] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ game, author: user, content, rating })
            });

            const data = await response.json();

            if (response.ok) {
                onClose();
            } else {
                setError(data.message || 'Error creating review');
            }
        } catch (error) {
            setError('Error creating review');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                <h2>Create a Review</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='game'>Game:</label>
                        <input type="text" value={game} className="p-2 border border-gray-300" onChange={(e) => setGame(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor='content'>Content:</label>
                        <textarea value={content} className="p-2 border border-gray-300" onChange={(e) => setContent(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <label htmlFor='rating'>Rating:</label>
                        <input type="number" className="p-1 border border-gray-300" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="10" required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default ReviewModal;
