import * as mongoose from 'mongoose';

export const AssessmentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: Boolean,
  title: String,
  result: String,
  result_riasec: {
    realistic: String,
    investigate: String,
    artistic: String,
    social: String,
    enterprising: String,
    conventional: String
  },
  created: {
    type: Date,
    default: Date.now,
  },
});
