import uuid from 'uuid/v4';
import Ottoman from 'ottoman';

let leaveCategoryModel = Ottoman.model('LeaveCategory',{
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  category: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    default: Date.now,
    required: true,
  },
});

export default leaveCategoryModel;
