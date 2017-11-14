import mongoose from 'mongoose';
import uuid from 'uuid/v4';

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  sid: {
    type: String,
    unique: true,
    trim: true,
    default: uuid,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  logo: {
    type: 'String',
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
  },
  fax: {
    type: String,
    trim: true,
    required: true,
  },
  country: {
    type: String,
    trim: true,
    required: true,
    default: 'Nigeria',
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    default: 'noemail@mail.com',
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.model('School', schoolSchema);
