import React, { useEffect, useState } from 'react';
import UserProfile from '../components/UserProfile';
import ReviewList from '../components/ReviewList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('fetching user data for:', userId);
                const response = await fetch(`/api/users/${userId}`);
                const data = await response.json();
                console.log('fetched user data:');
                if (response.ok) {
                    setUser(data);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError('Error fetching user data');
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div>
            <Header />
            <main>
                {user ? (
                    <>
                        <UserProfile user={user} />
                        <h2>Reviews by {user.username}</h2>
                        <ReviewList userId={userId} />
                    </>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <p>Loading...</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default UserProfilePage;
