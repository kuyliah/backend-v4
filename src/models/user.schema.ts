import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: {
    type: String,
    select: false,
  },
  fullname: String,
  student: {
    type: Boolean,
    default: false,
  },
  membership: {
    type: Boolean,
    default: false,
  },
  address: {
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  assessment: {
    status: Boolean,
    title: String,
    result: String,
    result_riasec: String
  },
  created: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
