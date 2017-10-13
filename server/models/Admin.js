import mongoose from 'mongoose';
import validator from 'validator';
import LocalMongoose from 'passport-local-mongoose';
import uuid from 'uuid/v4';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  id: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    default: uuid,
  },
  number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    default: 'noemail@mail.com',
  },
  userType: {
    type: String,
    lowercase: true,
    trim: true,
    default: 'admin',
  },
});

adminSchema.plugin(LocalMongoose);

export default mongoose.model('Admin', adminSchema);
