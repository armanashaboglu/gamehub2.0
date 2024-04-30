import passport from '../config/passport-config';

export const requireAuth = passport.authenticate('local', { session: false });

export const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('User is not authenticated');
};
