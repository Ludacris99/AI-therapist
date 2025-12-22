import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// caching the mongoose instance as global so connection doesnt renew each time
let cached = global.mongoose || { conn: null, promise: null };

// Ensure the global object stays updated
if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
    // STATE 1: Already connected? -> Use that connection
    if (cached.conn) {
      return cached.conn;
    } 
    
    // STATE 2: Not connected, but connecting...? -> Just wait for the work that is already happening
    else if (cached.promise) {
        try {
            cached.conn = await cached.promise;
          } catch (e) {
            cached.promise = null; // If it fails, reset everything so we can try again next time
            throw e;
          }
    } 
    
    // STATE 3: Not connected AND not connecting? -> start new connection 
    else {
      cached.promise = mongoose.connect(MONGODB_URI);
  
      try {
        cached.conn = await cached.promise;
      } catch (e) {
        cached.promise = null;
        throw e;
      }
    }
    return cached.conn;
  }

export default connectDB;