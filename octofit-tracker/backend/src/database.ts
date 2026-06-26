import mongoose from 'mongoose';

export const MONGO_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

mongoose.set('strictQuery', true);

export async function connectDatabase() {
  return mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  });
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
