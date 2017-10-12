import mongoose from 'mongoose';
import { dbs } from '../routes';
let Schema = mongoose.Schema;

let schoolSchema = new Schema({
  name: String,
  students: Number,
  address: String,
});

export default mongoose.model('School', schoolSchema);

// export default function School(req) {
//   let { db_uri } = req;
//   return mongoose.createConnection(req ? db_uri : dbs.default.uri).model('School', schoolModel);
// }
