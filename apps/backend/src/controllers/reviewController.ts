import Review from '../models/review';
import Game from '../models/game'

export const createReview = async (req, res) => {
    try {
        const { game, content, author, rating } = req.body;

        // console.log('Creating review for game:', game);

        const existingGame = await Game.findOne({ title: game });

        let gameId;
        if (!existingGame) {
            const newGame = new Game({ title: game, description: 'n/a', releaseDate: '', genre: '', developer: '', publisher: '', platform: '' });
            await newGame.save();
            gameId = newGame._id;
            console.log('Created new game:', newGame);
        } else {
            gameId = existingGame._id;
        }
        const newReview = new Review({ game: gameId, author: author._id, authorName: author.username, content, rating });
        await newReview.save();
        console.log('Created new review:', newReview);
        res.status(201).json(newReview);
    } catch (error) {
        console.log('Error creating review:', error);
        res.status(400).json({ message: 'Error creating review', error: error.message });
    }
};


export const getReviewsByGame = async (req, res) => {
    try {
        const reviews = await Review.find({ game: req.params.gameId }).populate('author', 'username');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { content, rating } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(req.params.reviewId, {
            content, rating
        }, { new: true });
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: 'Error updating review', error: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndRemove(req.params.reviewId);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};

export const getReviewsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Fetching review by userId:', userId);
        const reviews = await Review.find({ author: userId }).populate('game', 'title');
        // console.log(reviews);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};
