mongoose = require("mongoose");

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

const User = mongoose.model("User", UserSchema);

module.exports = User;