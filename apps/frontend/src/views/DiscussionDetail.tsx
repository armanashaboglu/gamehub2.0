import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../components/CommentList';
import NewCommentForm from '../components/NewCommentForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DiscussionDetail = () => {
    const { discussionId } = useParams();
    const [discussion, setDiscussion] = useState(null);
    const [error, setError] = useState(null);
    const [selectedComment, setSelectedComment] = useState(null);

    useEffect(() => {
        const fetchDiscussion = async () => {
            try {
                const response = await fetch(`/api/discussions/${discussionId}`);
                const data = await response.json();

                if (response.ok) {
                    setDiscussion(data);
                    console.log('comments are: ', discussion.comments);
                    for(let i = 0; i < discussion.comments.replies; i++){
                        console.log('comment reply is: ', discussion.comments.replies[i]);
                    }
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Error fetching discussion');
            }
        };

        fetchDiscussion();
    }, [discussionId]);

    if (!discussion) {
        return error ? <p>{error}</p> : <p>Loading...</p>;
    }

    return (
        <div>
            <Header />
            <h2 className='text-3xl font-bold tracking-tight'>{discussion.title}</h2>
            <p>By {discussion.authorName}</p>
            <p>{discussion.content}</p>

            <h3>Comments:</h3>
            <CommentList comments={discussion.comments} setSelectedComment={setSelectedComment} />

            <NewCommentForm discussionId={discussionId} parentCommentId={selectedComment} />
            <Footer />
        </div>
    );
};

export default DiscussionDetail;
