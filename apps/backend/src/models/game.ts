import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date
    },
    genre: {
        type: String
    },
    developer: {
        type: String
    },
    publisher: {
        type: String
    },
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);

export default Game;
