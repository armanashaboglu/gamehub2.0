import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import UserProfile from '../components/UserProfile';
import ReviewList from '../components/ReviewList';
import Footer from '../components/Footer';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
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
                    setError(data.message);
                }
            } catch (error) {
                setError('Error fetching user data');
            }
        };

        fetchUserData();
    }, []);

    const handleUpdate = async (updatedUser) => {
        try {
            const response = await fetch('/api/users/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error updating user');
        }
    };

    return (
        <div>
            <Header />
            <main>
                {user ? (
                    <>
                        <UserProfile user={user} onUpdate={handleUpdate} />
                        <h2>Reviews by {user.username}</h2>
                        <ReviewList userId={user._id} />
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

export default ProfilePage;
