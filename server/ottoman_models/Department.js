import Ottoman from 'ottoman';
import uuid from 'uuid/v4';

let departmentModel = Ottoman.model('Department',{
    sid: {
    type: String,
    required: true,
    default: uuid,
  },
  departmentTitle: {
    type: String,
    required: true,
    trim: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
});

export default departmentModel;
