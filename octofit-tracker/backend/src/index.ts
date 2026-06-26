import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const mongoUri = 'mongodb://127.0.0.1:27017/octofit-tracker';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB at', mongoUri);
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
