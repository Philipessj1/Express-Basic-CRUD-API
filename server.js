import express from 'express';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import handleError from './middleware/error.js';

const app = express();

const PORT = process.env.PORT;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// Posts routes
app.use('/api/posts', posts);

// Error Handler
app.use(handleError);

// Port Listener
app.listen(PORT, () => {

    console.log(`Server is Running on ${PORT}`);
});