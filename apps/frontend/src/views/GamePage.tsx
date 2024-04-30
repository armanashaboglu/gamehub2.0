import React from 'react';
import GameDetail from '../components/GameDetail';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';


const GamePage = () => {
    const { gameId } = useParams();
    return (
        <div>
            <Header />
            <main>
                <GameDetail gameId={gameId}/>
            </main>
            <Footer />
        </div>
    );
};

export default GamePage;
