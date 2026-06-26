import { Router } from 'express';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name email role');
    res.json({ data: teams });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load teams.' });
  }
});

export default router;
