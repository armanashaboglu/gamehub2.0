import Discussion from '../models/discussion';
import Comment from '../models/comment';

export const createDiscussion = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newDiscussion = new Discussion({ title, content, author: author._id, authorName: author.username });
        await newDiscussion.save();
        res.status(201).json(newDiscussion);
    } catch (error) {
        res.status(400).json({ message: 'Error creating discussion', error: error.message });
    }
};

export const getAllDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find({}).populate('author', 'username').sort({ createdAt: -1 });
        res.status(200).json(discussions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching discussions', error: error.message });
    }
};

const populateReplies = async (comment) => {
    comment.replies = await Comment.find({ parentComment: comment._id })
        .populate('author', 'username')
        .exec();

    for (const reply of comment.replies) {
        await populateReplies(reply);
    }
};


export const getDiscussionById = async (req, res) => {
    try {
        console.log('fetching discussion:', req.params.discussionId);
        const discussion = await Discussion.findById(req.params.discussionId)
            .populate({
                path: 'comments',
                populate: { path: 'author', select: 'username' },
            })
            .populate({
                path: 'comments.replies',
                populate: { path: 'author', select: 'username' }
            });
            console.log('got discussion:', discussion);
            for (const comment of discussion!.comments) {
                await populateReplies(comment);
            }
            
        res.status(200).json(discussion);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching discussion', error: error.message });
    }
};

export const postComment = async (req, res) => {
    try {
        const { content, author, parentComment } = req.body;
        // console.log('posting comment:', content, author, parentComment);
        const newComment = new Comment({
            content, author: author.id, authorName: author.username, discussion: req.params.discussionId, parentComment
        });
        await newComment.save();
        
        if (parentComment) {
            const parent = await Comment.findById(parentComment);
            parent!.replies.push(newComment._id);
            await parent!.save();
        } else {
            console.log('linking comment to discussion');
            const discussion = await Discussion.findById(req.params.discussionId);
            discussion!.comments.push(newComment._id);
            await discussion!.save();
        }

        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: 'Error posting comment', error: error.message });
    }
};

export const deleteDiscussion = async (req, res) => {
    try {
        await Discussion.findByIdAndRemove(req.params.discussionId);
        await Comment.deleteMany({ discussion: req.params.discussionId });
        res.status(200).json({ message: 'Discussion deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting discussion', error: error.message });
    }
};
