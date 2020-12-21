const User = require("../models/UserSchema");
const { check, validationResult } = require("express-validator");

exports.getUsers = (req, res) => {
  // Getting all users
  User.find()
    .sort({ age: -1 })
    .exec((err, users) => {
      if (err || !users) {
        return res.status(400).json({
          error: "No Users Found",
        });
      }

      return res.status(200).json({
        message: "Users found",
        users: users,
      });
    });
};

exports.addUser = (req, res) => {
  // Creating a new user
  const user = new User(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }

  // Saving the user to the database
  user.save((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Not able to add user",
      });
    }

    return res.status(200).json({
      message: "Successfully added a user",
      user: {
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found",
      });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
    });
  });
};

exports.editUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndUpdate(
    id,
    { name: req.body.name, email: req.body.email, age: req.body.age },
    (err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: "Error, not able to update user",
        });
      }

      return res.json(updatedUser);
    }
  );
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id, (err, post) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to find user",
      });
    }

    post.remove((err, post) => {
      if (err) {
        return res.status(400).json({
          error: "Not able to delete user",
        });
      }

      return res.json({
        message: "User successfully deleted",
      });
    });
  });
};
