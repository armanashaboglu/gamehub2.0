import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DiscussionList = () => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await fetch('/api/discussions');
                const data = await response.json();
                setDiscussions(data);
            } catch (error) {
                console.log('Error fetching discussions:', error);
            }
        };

        fetchDiscussions();
    }, []);

    return (
        <ul className="discussion-list">
            {discussions.map(discussion => (
                <li className='p-2 border border-gray-300 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out' key={discussion._id}>
                    <Link to={`/discussions/${discussion._id}`}>
                        <h3>{discussion.title}</h3>
                        <p>{discussion.content}</p>
                        <p>By {discussion.author.username}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default DiscussionList;
