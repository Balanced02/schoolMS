import Ottoman from 'ottoman';
import uuid from 'uuid/v4';

let courseModel = Ottoman.model('Course',{
   sid: {
    type: String,
    required: true,
    default: uuid,
  },
  courseName: {
    type: String,
    required: true,
    trim: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    trim: true,
  },
  minAttendance: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default courseModel;
