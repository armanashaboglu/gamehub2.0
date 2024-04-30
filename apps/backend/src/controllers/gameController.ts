import Game from '../models/game';

export const createGame = async (req, res) => {
    try {
        const { title, description, releaseDate, genre, developer, publisher, platform } = req.body;
        const newGame = new Game({ title, description, releaseDate, genre, developer, publisher, platform });
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ message: 'Error creating game', error: error.message });
    }
};

export const getAllGames = async (req, res) => {
    try {
        const games = await Game.find({});
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching games', error: error.message });
    }
};

export const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({ message: 'Game not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching game', error: error.message });
    }
};

export const updateGame = async (req, res) => {
    try {
        const { title, description, releaseDate, genre, developer, publisher, platform } = req.body;
        const updatedGame = await Game.findByIdAndUpdate(req.params.id, {
            title, description, releaseDate, genre, developer, publisher, platform
        }, { new: true });
        res.status(200).json(updatedGame);
    } catch (error) {
        res.status(400).json({ message: 'Error updating game', error: error.message });
    }
};

export const deleteGame = async (req, res) => {
    try {
        await Game.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Game deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting game', error: error.message });
    }
};

export const searchGames = async (req, res) => {
    try {
        const query = req.query.query || '';
        console.log('Searching game:', req.query.query);
        const games = await Game.find({ title: { $regex: query, $options: 'i' } });
        res.status(200).json(games);
    } catch (error) {
        console.log('Error searching games:', error.message);
        res.status(500).json({ message: 'Error searching games', error: error.message });
    }
};
