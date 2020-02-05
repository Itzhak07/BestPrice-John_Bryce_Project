var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const userAuth = require("../middleware/user-auth-mw");
const AuthController = require("../controllers/authController");

/* GET User */
router.get("/", userAuth, async (req, res, next) => {
  try {
    const user = await AuthController.validateUser(req);
    res.json({ page: "user is authorized", user });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//POST Login
router.post(
  "/",
  [
    check("username", "username is required")
      .not()
      .isEmpty(),
    check("password", "Password is required")
      .not()
      .isEmpty()
  ],

  async (req, res, next) => {
    const reqErrors = validationResult(req);
    let { password, username } = req.body;

    if (!reqErrors.isEmpty()) {
      console.log(reqErrors.array());

      return res.status(400).json({ error: reqErrors.array() });
    }

    try {
      const user = await AuthController.checkUsername(username);

      const token = await AuthController.loginUser(user, password);

      res.json({ page: "Login Success", token });
    } catch (error) {
      console.log(error);

      res.status(400).json({ error });
    }
  }
);

module.exports = router;
