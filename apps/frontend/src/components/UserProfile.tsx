import React, { useState } from 'react';

const UserProfile = ({ user, onUpdate }) => {
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ username, bio });
    };

    return (
        <div>
            <h1>{user.username}'s Profile</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='bio'>Bio:</label>
                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UserProfile;
