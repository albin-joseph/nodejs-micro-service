import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;
beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri()

    await mongoose.connect(mongoUri, {});

    process.env.JWT_KEY = 'asdfasdf';
});

beforeEach(async () => {
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.collections();
   
      for (let collection of collections) {
        await collection.deleteMany({});
      }
    }
  });

afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
  });
  
