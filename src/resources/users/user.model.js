const mongoose = require('mongoose');
const uuid = require('uuid');
const { hashPassword } = require('../../common/hash');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: {
      type: String,
      unique: true
    },
    password: String
  },
  { versionKey: false }
);

userSchema.pre('save', async function cb(next) {
  this.password = await hashPassword(this.password);
  next();
});

userSchema.pre('findOneAndUpdate', async function cb(next) {
  this._update.password = await hashPassword(this._update.password);
  next();
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
