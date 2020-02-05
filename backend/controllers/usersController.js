const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

class UsersController {
  static checkUsername(req) {
    return new Promise((resolve, reject) => {
      const { username } = req.body;
      let user = User.findOne({ username }, (error, user) => {
        if (user) {
          reject({ msg: "Username already exists" });
        }
        resolve(user);
      });
    });
  }

  static checkUserID(req) {
    return new Promise((resolve, reject) => {
      const { identification } = req.body;
      console.log("id is " + identification);

      let user = User.findOne({ identification }, (error, user) => {
        if (user) {
          reject({ msg: "ID is already exists" });
        }
        resolve(user);
      });
    });
  }

  static checkUserEmail(req) {
    return new Promise((resolve, reject) => {
      const { email } = req.body;
      let user = User.findOne({ email }, (error, user) => {
        if (user) {
          reject({ msg: "Email is already exists" });
        }
        resolve(user);
      });
    });
  }

  static addNewUser(req) {
    let {
      username,
      identification,
      email,
      password,
      firstName,
      lastName,
      city,
      street
    } = req.body;

    return new Promise(async (resolve, reject) => {
      let newUser = new User({
        identification: identification,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        city: city,
        street: street,
        role: 2
      });

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();

      const payload = {
        user: {
          id: newUser._id,
          role: newUser.role
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) reject(error);
          resolve(token);
        }
      );
    });
  }
}

module.exports = UsersController;
