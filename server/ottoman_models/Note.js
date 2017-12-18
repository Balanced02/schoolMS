import Ottoman from 'ottoman';
import uuid from 'uuid/v4';

let noteModel = Ottoman.model('Note',{
   sid: {
    type: String,
    unique: true,
    default: uuid,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default noteModel;
