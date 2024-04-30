import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../styles/logo.jpeg'; 

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('/api/users/logout', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            // remove token so no longer logged in
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    return (
        <header>
            <div className="mb-10">
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-10 p-2">
                    <img 
                        alt="Logo"
                        className="h-14 w-14"
                        src={logo}/>
                </div>
                <nav className="flex fixed top-0 right-0 z-10 space-x-4 p-3">
                    <Link to="/" className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200">Home</Link>
                    <Link to="/discussions" className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200">Discussions</Link>
                    <Link to="/profile" className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200">Profile</Link>
                    <Link to="/register" className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200">Register</Link>
                    <Link to="/login" className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200">Login</Link>
                    <button onClick={handleLogout} className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-200">Logout</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
