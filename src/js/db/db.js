import mongoose from 'mongoose';

// Set up mongoose connection to MongoDB
function conn() {
  const dbUri = 'mongodb+srv://shen:mongomongoose@employees.m7oay.mongodb.net/?retryWrites=true&w=majority';
  const mongoDB = process.env.DB_URI || dbUri;
  mongoose.connect(mongoDB);
  const conn = mongoose.connection;
  conn.on('error', console.error.bind(console, 'MongoDB connection error:'));
  return conn;
};

export default conn;
