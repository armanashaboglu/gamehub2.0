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
                <h2 className='text-3xl font-bold tracking-tight'>s</h2>
                <GameDetail gameId={gameId}/>
            </main>
            <Footer />
        </div>
    );
};

export default GamePage;
