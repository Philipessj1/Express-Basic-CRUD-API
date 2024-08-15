import express from 'express';
import posts from './routes/posts.js';

const app = express();

const PORT = process.env.PORT;

app.use('/api/posts', posts);

app.listen(PORT, () => {

    console.log(`Server is Running on ${PORT}`);
});