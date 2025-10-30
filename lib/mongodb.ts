import mongoose from 'mongoose'

declare global {
  var mongoose: any
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI && typeof window === 'undefined') {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = (globalThis as any).mongoose

if (!cached) {
  cached = (globalThis as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined')
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect