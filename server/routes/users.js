const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const {
  getUsers,
  addUser,
  getUser,
  editUser,
  deleteUser,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:id", getUser);

router.put("/users/:id/edit", editUser);

router.delete("/users/:id/delete", deleteUser);

router.post(
  "/users/add",
  [
    check("name", "Name should be at least 2 characters").isLength({ min: 2 }),
    check("email", "Email is not valid").isEmail(),
    check("age", "Age is required").isLength({ min: 0 }),
  ],
  addUser
);

module.exports = router;
