var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const UsersController = require("../controllers/usersController");

const adminMW = require("../middleware/admin-auth-mw");

// POST Check ID
router.post(
  "/check-id",
  [
    check("identification", "Please enter a valid ID Number").isLength({
      min: 9
    })
  ],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }

    try {
      await UsersController.checkUserID(req);

      res.json({ page: "New User Validation: ID", result: "ID is valid" });
    } catch (error) {
      console.log(error);

      res.status(400).json([error]);
    }
  }
);

// POST Check Email
router.post(
  "/check-email",
  [check("email", "Please enter a valid email").isEmail()],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }

    try {
      await UsersController.checkUserEmail(req);

      res.json({
        page: "New User Validation: Email",
        result: "Email is valid"
      });
    } catch (error) {
      console.log(error);

      res.status(400).json([error]);
    }
  }
);

// POST Check Username
router.post(
  "/check-username",
  [
    check("username", "username is required")
      .not()
      .isEmpty()
  ],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error.array());
    }

    try {
      await UsersController.checkUsername(req);

      res.json({
        page: "New User Validation: Username",
        result: "Username is valid"
      });
    } catch (error) {
      console.log(error);

      res.status(400).json([error]);
    }
  }
);

// POST New User
router.post("/", async (req, res, next) => {
  console.log(req.body);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array());
  }

  try {
    const token = await UsersController.addNewUser(req);

    res.json({ page: "add new User", token });
  } catch (error) {
    console.log(error);

    res.status(400).json({ error });
  }
});

module.exports = router;
