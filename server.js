import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import handleError from './middleware/error.js';
import handleNotFound from './middleware/notfound.js';

// get the resolved path to the file
const __filename = fileURLToPath(import.meta.url);

// get the name of the directory
const __dirname = path.dirname(__filename);


const app = express();

const PORT = process.env.PORT;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger Middleware
app.use(logger);

// Setup static folder
app.use(express.static(path.join(__dirname, 'public')));

// Posts routes
app.use('/api/posts', posts);

// Error Handler
app.use(handleNotFound);
app.use(handleError);

// Port Listener
app.listen(PORT, () => {

    console.log(`Server is Running on ${PORT}`);
});
