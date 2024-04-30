import express from 'express';
import * as gameController from '../controllers/gameController';

const router = express.Router();

// Search games
router.get('/search', gameController.searchGames);

// Create game
router.post('/', gameController.createGame);

// Get all games
router.get('/', gameController.getAllGames);

// Get a single game by id
router.get('/:id', gameController.getGameById);

// Update game by id
router.put('/:id', gameController.updateGame);

// Delete a game by id
router.delete('/:id', gameController.deleteGame);


export default router;
