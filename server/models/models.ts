const promiseBlueBird = require('bluebird');
const bcrypt = promiseBlueBird.promisifyAll(require('bcrypt-nodejs'));

mongoose = require("mongoose");

function hashPassword (user) {
  const SALT_FACTOR = 8

  if (!user.isModified('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.password = hash;
    })
}

const UserSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, 'name field is required'],
      },
      email: {
        type: String,
        required: [true, 'email field is required'],
        unique : true,
      },
      password: {
        type: String,
        required: [true, 'password field is required'],
      },
      age: {
        type: Number,
        required: [true, 'age field is required'],
      },
    },
    { timestamps: true },
  );

UserSchema.pre('save', async function() {
  hashPassword(this);
});

const User = mongoose.model("User", UserSchema);

User.prototype.comparePassword = function (password) {
  return bcrypt.compareAsync(password, this.password);
}

module.exports = User;