import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let visitorSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuid,
    unique: true,
  },
  visitorName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  visiting: {
    type: String,
    required: true,
    trim: true,
  },
  timeIn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  timeOut: {
    type: Date,
  },
});

export default mongoose.model('Visitor', visitorSchema);
