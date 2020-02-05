const User = require("../models/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

class AuthController {
  static validateUser(req) {
    return new Promise((resolve, reject) => {
      const { id } = req.user;
      console.log(id);

      let userValidation = User.findById(id)
        .select("-password")
        .exec((err, user) => {
          if (err) reject(err);
          resolve(user);
        });
    });
  }

  static checkUsername(username) {
    return new Promise((resolve, reject) => {
      let user = User.findOne({ username }, (error, user) => {
        if (!user) {
          reject({ msg: "Invalid Credentials" });
        }
        resolve(user);
      });
    });
  }

  static loginUser(user, password) {
    return new Promise(async (resolve, reject) => {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        reject({ msg: "Invalid Credentials" });
      }
      const payload = {
        user: {
          id: user._id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        }
      );
    });
  }
}

module.exports = AuthController;
