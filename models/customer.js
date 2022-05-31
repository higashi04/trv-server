const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

customerSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

customerSchema.methods.comparePassword = function (inputedPassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputedPassword, user.password, (err, isMatch) => {
      if (err) {
          return reject(err);
        }
      if (!isMatch) {
          return reject(false);
        }
      resolve(true)
    });
  });
};
customerSchema.virtual("fullname").get(function () {
  const fullname = `${this.firstName} ${this.lastName}`;
  return fullname;
});

module.exports = mongoose.model("customers", customerSchema);
