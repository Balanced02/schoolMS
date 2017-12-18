import Ottoman from 'ottoman';
import uuid from 'uuid/v4';

let payHeadModel = Ottoman.model({
  sid: {
    type: String,
    unique: true,
    default: uuid,
  },
  payHeadType: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  created: {
    type: String,
    default: Date.now,
    required: true,
  },
});
export default payHeadModel;