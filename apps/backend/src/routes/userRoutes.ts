import express from 'express';
import passport from 'passport';
import * as userController from '../controllers/userController';
import { verifyToken } from '../utils/tokenUtil';


const router = express.Router();

// Middleware to protect routes
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.status(401).json({ message: "Unauthorized" });
// }

function isLoggedIn(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
    console.log('token is: ', token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        // console.log('In try, verifying token: ', token);
        const decoded = verifyToken(token);
        // console.log('verified the token: ', decoded);
        req.user = decoded;  
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: ", error });
    }
}


router.post('/register', userController.registerUser);

router.post('/login', passport.authenticate('local', { session: false }), userController.loginUser);

// Get Current User's Profile
router.get('/me', isLoggedIn, userController.getCurrentUser);

// Update User Profile
router.put('/update', isLoggedIn, userController.updateUser);

router.get('/logout', isLoggedIn, userController.logoutUser);

router.get('/search', userController.searchUsers);

router.get('/:userId', userController.getUserById);

export default router;
