import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort('rank').populate('userId', 'name email');
    res.json({ data: leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load leaderboard.' });
  }
});

export default router;
