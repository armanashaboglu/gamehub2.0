import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DiscussionList from '../components/DiscussionList';
import DiscussionModal from '../components/DiscussionModal';
import { useNavigate } from 'react-router-dom';

const DiscussionPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch('/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();

                if (response.ok) {
                    setUser(data);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                setError('Error fetching current user');
                navigate('/login');
            }
        };

        fetchCurrentUser();
    }, [navigate]);

    const toggleModal = () => setShowModal(!showModal);

    return (
        <div>
            <Header />
            <main>
                <h1>Discussions</h1>
                <button onClick={toggleModal}>Create Discussion</button>
                <DiscussionList />

                {showModal && <DiscussionModal onClose={toggleModal} user={user} />}
            </main>
            <Footer />
        </div>
    );
};

export default DiscussionPage;
