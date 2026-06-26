import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await User.find().populate('teamId', 'name city');
    res.json({ data: users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load users.' });
  }
});

export default router;
