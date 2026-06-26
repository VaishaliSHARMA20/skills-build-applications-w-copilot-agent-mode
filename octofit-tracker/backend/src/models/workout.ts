import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  durationMinutes: { type: Number, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: () => new Date() }
});

export default model('Workout', workoutSchema);
