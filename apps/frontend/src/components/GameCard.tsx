import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
    return (
        <div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <Link to={`/games/${game._id}`}>View More</Link>
        </div>
    );
};

export default GameCard;
