import mongoose from 'mongoose';
import LocalMongoose from 'passport-local-mongoose';
import { request } from 'http';
import uuid from 'uuid/v4';
import Ottoman from 'ottoman';

const usersModel = ({
  sid: {
    type: String,
    required: true,
    default: uuid,
  },
  schoolId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  userType: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  module: {
    type: String,
    lowercase: true,
    default: 'bronze',
  },
});

usersModel.plugin(LocalMongoose);

export default usersModel;