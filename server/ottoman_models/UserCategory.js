import Ottoman from 'ottoman';
import uuid from 'uuid/v4';

let userCategoryModel = Ottoman.model({
  sid: {
    type: String,
    unique: true,
    default: uuid,
  },
  userType: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  created: {
    type: String,
    default: Date.now,
    required: true,
  },
});

export default userCategoryModel;