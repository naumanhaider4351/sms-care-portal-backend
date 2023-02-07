import mongoose from 'mongoose';
import { DATABASE_URI } from './config';

export default function connectToDatabase(
  cb: (err: Error) => void,
): (err: Error) => void {
  mongoose.Promise = global.Promise;
  mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  mongoose.connection.on(
    'error',
    console.error.bind(
      console,
      'MongoDB connection error. Please make sure MongoDB is running.',
    ),
  );

  mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established succesfully 🤖');
  });
  return cb;
}
