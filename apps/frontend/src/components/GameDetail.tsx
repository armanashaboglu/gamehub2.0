import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';

const GameDetail = ({ gameId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log('fetching game reviews');
                const response = await fetch(`/api/reviews/${gameId}`);
                const data = await response.json();

                if (response.ok) {
                    setReviews(data);
                }
            } catch (error) {
                console.log('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [gameId]);

    return (
        <div>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id}>
                        <p>{review.authorName}: {review.content} (Rating: {review.rating})</p>
                    </div>
                ))
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
};

export default GameDetail;
