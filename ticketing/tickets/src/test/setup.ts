import { MongoMemoryServer } from 'mongodb-memory-server';
import  request  from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt  from 'jsonwebtoken';
declare global {
  var signin: () => string[];
}

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

  global.signin =  () => {
      //Build a JWT payload. {id, email}
      const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'

      }
      //Create the JWT!
      const token = jwt.sign(payload, process.env.JWT_KEY!);

      //Build sesion Object. {jwt, MY_JWT}
      const session = {jwt: token};

      // Turn that sessiion to JSON
      const sessiionJSON = JSON.stringify(session);

      // Take JSON and encode it as base64
      const base64 = Buffer.from(sessiionJSON).toString('base64');

      // returns a string thats the cookie with the encoded data
      return [`session=${base64}`];
  }
  
