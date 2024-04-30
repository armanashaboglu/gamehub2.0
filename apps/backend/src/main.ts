import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import gameRoutes from './routes/gameRoutes';
import reviewRoutes from './routes/reviewRoutes';
import discussionRoutes from './routes/discussionRoutes';
import { connectDB } from './config/db';
import passport from './config/passport-config'; // Adjust the path as necessary




// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb+srv://armanash:Armie101@cluster0.qzfkz35.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['secret-key'],
  maxAge: 24 * 60 * 60 * 1000,
}));

connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/discussions', discussionRoutes);


app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, wow now!' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: 'Something broke!' });
};

app.use(errorHandler);

// mongoose.connect(MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

// listen

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
