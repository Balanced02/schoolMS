import Ottoman from 'ottoman';
import uuid from 'uuid/v4';

let academicDetailsModel = Ottoman.model('AcademicDetails',{
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  startYear: {
    type: String,
    required: true,
  },
  endYear: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    default: Date.now,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
});

export default academicDetailsModel;




