import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find();
    res.json({ data: workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load workouts.' });
  }
});

export default router;
