import React, { useEffect, useState } from 'react';

const ReviewList = ({ userId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                console.log('fetching reviews');
                const response = await fetch(`/api/reviews/user/${userId}`);
                const data = await response.json();

                if (response.ok) {
                    setReviews(data);
                }
            } catch (error) {
                console.log('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [userId]);

    return (
        <div>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} className='p-2 border border-gray-300 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out'>
                        <p>{review.game.title}: {review.content} (Rating: {review.rating})</p>
                    </div>
                ))
            ) : (
                <p>No reviews found.</p>
            )}
        </div>
    );
};

export default ReviewList;
