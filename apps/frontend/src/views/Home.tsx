import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import ReviewModal from '../components/ReviewModal';

const Home = () => {
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
                <h1 className='p-2'>Welcome to Gamehub</h1>
                <button onClick={toggleModal}>Create Review</button>
                <SearchBar />
                {showModal && <ReviewModal onClose={toggleModal} user={user} />}
            </main>
            <Footer />
        </div>
    );
};

export default Home;
