import express from 'express';
import * as discussionController from '../controllers/discussionController';

const router = express.Router();

// Create discussion
router.post('/', discussionController.createDiscussion);

// Get all discussions
router.get('/', discussionController.getAllDiscussions);

// post comment to discussion
router.post('/:discussionId/comments', discussionController.postComment);

// Get a single discussion by id including nested comments
router.get('/:discussionId', discussionController.getDiscussionById);

export default router;
