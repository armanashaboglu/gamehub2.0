import User from '../models/user';
import jwt from 'jsonwebtoken';
import { verifyToken, generateToken, blacklistToken } from '../utils/tokenUtil';

export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const newUser = new User({ username, password, bio: ''});
        const token = generateToken(newUser._id);
        // res.json({ token, username: user.username });
        console.log('Registering user:', username);
        await newUser.save();
        res.status(201).json({ token, message: 'User registered successfully' });
        // res.json({ token, username: newUser.username });
    } catch (error) {
        const { username, password } = req.body;
        console.log('Error registering user:', username);
        res.status(500).json({ message: 'Error registering user' });
    }
};

export const loginUser = (req, res) => {
    const user = req.user;
    console.log("reached loginuser: ");
    if (!user) {
        return res.status(401).json({ message: 'Login failed: User not found or incorrect credentials.' });
    }
    // console.log("trying to log in user: ", user);
    const token = jwt.sign({ id: user._id }, 'Armie101', { expiresIn: '1d' });
    res.json({ message: 'Logged in successfully', token });
};

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log('user is: ', user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { username, bio } = req.body;
        console.log('updating user: ', username);
        const user = await User.findByIdAndUpdate(req.user.id, { username, bio }, { new: true });
        console.log('updated user: ', user);
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        console.log('we fucked up');
        res.status(500).json({ message: 'Error updating user' });
    }
};

export const logoutUser = (req, res) => {
    console.log('Logging out user: ', req.user.username);
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        blacklistToken(token);
    }

    res.json({ message: 'Logged out successfully' });
};


export const searchUsers = async (req, res) => {
    try {
        const query = req.query.query || '';
        const users = await User.find({ username: { $regex: query, $options: 'i' } });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error searching users', error: error.message });
    }
};

export const getUserById = async (req, res) => {
    // console.log('Trying to fetch by userId');
    try {
        const { userId } = req.params;
        // console.log('Fetching user by ID:', userId);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data by id', error: error.message });
    }
};
