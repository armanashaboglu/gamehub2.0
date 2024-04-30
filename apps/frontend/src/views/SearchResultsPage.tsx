import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

const SearchResultsPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    const [userResults, setUserResults] = useState([]);
    const [gameResults, setGameResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const userResponse = await fetch(`/api/users/search?query=${query}`);
                const userData = await userResponse.json();
                setUserResults(userData);

                const gameResponse = await fetch(`/api/games/search?query=${query}`);
                const gameData = await gameResponse.json();
                setGameResults(gameData);
            } catch (error) {
                console.log('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div>
            <Header />
            <main>
                <h1>Search Results</h1>
                <SearchBar />
                
                <h2>Users:</h2>
                {userResults.length > 0 ? (
                    userResults.map(user => (
                        <div className='border border-gray rounded-lg mb-2 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out' key={user._id}>
                            <Link to={`/users/${user._id}`}>{user.username}</Link>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}

                <h2>Games:</h2>
                {gameResults.length > 0 ? (
                    gameResults.map(game => (
                        <div className='border border-gray rounded-lg mb-2 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out' key={game._id}>
                            <Link to={`/games/${game._id}`}>{game.title}</Link>
                        </div>
                    ))
                ) : (
                    <p>No games found.</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default SearchResultsPage;
