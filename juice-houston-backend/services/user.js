const bcrypt = require("bcrypt");
const User = require("../models/user");
const getSignedToken = require("../utils/signedToken");

async function createUser(payload) {
  return User.find({ email: payload.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        throw new Error("User already exist");
      }
      return bcrypt
        .hash(payload.password, 10)
        .then((hashed) => {
          const newUser = new User({
            name: payload.name,
            email: payload.email,
            password: hashed,
            address: payload.address,
            phone: payload.phone,
            zipcode: payload.zipcode
          });
          return newUser.save();
        })
        .catch((err) => {
          throw new Error("All field required");
        });
    });
}

function signInUser(payload) {
  return User.findOne({ email: payload.email })
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error("Please enter email or password");
      } else {
        return bcrypt
          .compare(payload.password, user.password)
          .then((res) => {
            if (res) {
              const token = getSignedToken(user._id);
              return token;
            } else {
              throw new Error("Incorrect password or email, try again");
            }
          })
          .catch((err) => {
            throw new Error("All field required");
          });
      }
    });
}
module.exports = { createUser, signInUser };
