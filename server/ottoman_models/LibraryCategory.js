import uuid from 'uuid/v4';
import Ottoman from 'ottoman';

let libraryCategoryModel = Ottoman.model('LibraryCategory',{
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  category: {
    type: String,
    required: true,
  },
  sectionCode: {
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

export default libraryCategoryModel;