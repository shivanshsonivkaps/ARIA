import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    throw new Error("URL NOT DEFINED");
  }

  const opts = {
    dbName: "nasagpt",
    bufferCommands: false,
  };

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI, opts);

  cached.conn = await cached.promise;
  console.log("connectToDatabase");
  return cached.conn;
};
