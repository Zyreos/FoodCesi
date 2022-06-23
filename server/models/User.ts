const promiseBlueBird = require('bluebird');
const bcrypt = promiseBlueBird.promisifyAll(require('bcrypt-nodejs'));

let mongoose = require("mongoose");

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
      profile_picture: {
        data: Buffer,
        contentType: String
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
      role: {
        type: String,
        default: "client",
        required: false,
      },
      god_father: {
        type: Array,
        required: false
      },
      god_son: {
        type: Array,
        required: false
      },
      address: {
        street: {
          type: String,
          required: false
        },
        city: {
          type: String,
          required: false
        },
        postal_code: {
          type: Number,
          required: false
        },
        required: false
      },
      notification: {
        time: {
          type: String,
          required: false
        },
        message: {
          type: String,
          required: false
        },
        required: false
      },
      status: {
        type: String,
        required: false
      },
      category: {
        type: String,
        default: "active",
        required: false
      },
      description: {
        type: String,
        required: false
      },
      schedule: {
        start: {
          type: String,
          required: false
        },
        end: {
          type: String,
          required: false
        },
        required: false
      }
    },
    { timestamps: true },
  );

UserSchema.pre('save', async function() {
  hashPassword(this);
});

const UserModel = mongoose.model("User", UserSchema);

UserModel.prototype.comparePassword = function (password) {
  return bcrypt.compareAsync(password, this.password);
}

module.exports = UserModel;