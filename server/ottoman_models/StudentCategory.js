import Ottoman from 'ottoman';
import uuid from 'uuid/v4';

const StudentCategoryModel = Ottoman.model('StudentCategory',{
  sid: {
    type: String,
    unique: true,
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
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default StudentCategoryModel;
