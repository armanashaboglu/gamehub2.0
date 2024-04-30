import express from 'express';
import * as reviewController from '../controllers/reviewController';

const router = express.Router();

// Post review
router.post('/', reviewController.createReview);

// Get all reviews for a specific game
router.get('/:gameId', reviewController.getReviewsByGame);

// Update review by id
router.put('/:reviewId', reviewController.updateReview);

// Delete review by id
router.delete('/:reviewId', reviewController.deleteReview);

router.get('/user/:userId', reviewController.getReviewsByUser);

export default router;
