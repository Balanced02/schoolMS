import Ottoman from 'ottoman';
import uuid from 'uuid/v4';

let noticeModel = Ottoman.model('Notice',{
 sid: {
    type: String,
    unique: true,
    default: uuid,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
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
    required: true,
    default: Date.now,
  },
});

export default noticeModel;
