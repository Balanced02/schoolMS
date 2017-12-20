import mongoose from 'mongoose';
import uuid from 'uuid/v4';

let ParentSchema = new mongoose.Schema({
  sid: {
    type: String,
    unique: true,
    required: true,
    default: uuid,
  },
  schoolId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  officeAddress: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

});

export default mongoose.model('Parent', ParentSchema);
