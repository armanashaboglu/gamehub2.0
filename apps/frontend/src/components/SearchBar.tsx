import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search?query=${searchTerm}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" className="search-bar border border-gray-300 rounded-lg mb-4 shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search games or users..." />
            <button type="submit" className="search-button">Search</button>
        </form>
    );
};

export default SearchBar;
