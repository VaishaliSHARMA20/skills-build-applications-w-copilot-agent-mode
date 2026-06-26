/**
 * Seed the octofit_db database with test data
 */
import { connectDatabase, disconnectDatabase, MONGO_URI } from '../database.js';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await connectDatabase();
  console.log('Connected to MongoDB at', MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const teamA = await Team.create({ name: 'Velocity Vipers', city: 'Austin' });
  const teamB = await Team.create({ name: 'Pace Pioneers', city: 'Portland' });

  const users = await User.create([
    { name: 'Nina Sharp', email: 'nina.sharp@example.com', role: 'admin', teamId: teamA._id },
    { name: 'Jamal Carter', email: 'jamal.carter@example.com', role: 'coach', teamId: teamA._id },
    { name: 'Lena Brooks', email: 'lena.brooks@example.com', role: 'member', teamId: teamB._id },
    { name: 'Alex Rivera', email: 'alex.rivera@example.com', role: 'member', teamId: teamB._id }
  ]);

  teamA.members = [users[0]._id, users[1]._id];
  teamB.members = [users[2]._id, users[3]._id];
  await teamA.save();
  await teamB.save();

  await Activity.create([
    { userId: users[0]._id, type: 'Run', durationMinutes: 35, caloriesBurned: 430, date: new Date('2026-06-22') },
    { userId: users[1]._id, type: 'Cycling', durationMinutes: 55, caloriesBurned: 620, date: new Date('2026-06-23') },
    { userId: users[2]._id, type: 'Yoga', durationMinutes: 40, caloriesBurned: 190, date: new Date('2026-06-21') },
    { userId: users[3]._id, type: 'HIIT', durationMinutes: 30, caloriesBurned: 510, date: new Date('2026-06-24') }
  ]);

  await Leaderboard.create([
    { userId: users[0]._id, score: 1410, rank: 1 },
    { userId: users[1]._id, score: 1340, rank: 2 },
    { userId: users[3]._id, score: 1210, rank: 3 }
  ]);

  await Workout.create([
    { name: 'Sunrise Sprint', difficulty: 'intermediate', durationMinutes: 30, tags: ['running', 'endurance'] },
    { name: 'Core Crush', difficulty: 'advanced', durationMinutes: 45, tags: ['strength', 'core'] },
    { name: 'Recovery Flow', difficulty: 'beginner', durationMinutes: 20, tags: ['stretching', 'mobility'] }
  ]);

  console.log('Seed data inserted successfully.');
  await disconnectDatabase();
  console.log('Disconnected from MongoDB.');
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
