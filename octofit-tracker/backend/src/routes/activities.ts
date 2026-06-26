import { Router } from 'express';
import Activity from '../models/activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('userId', 'name email');
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load activities.' });
  }
});

export default router;
