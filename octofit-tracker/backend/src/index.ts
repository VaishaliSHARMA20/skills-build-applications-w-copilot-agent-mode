import express from 'express';
import { connectDatabase } from './database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = 8000;
const codespaceHost = process.env.CODESPACE_NAME
  ? `${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
  : 'localhost';

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl: `https://${codespaceHost}` });
});

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB at', process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db');
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`);
      if (process.env.CODESPACE_NAME) {
        console.log(`Codespace API URL: https://${codespaceHost}`);
      }
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
