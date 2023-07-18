const models = require("../models/userModel");

// Get user controller
const getUserDataCtrl = async (req, res) => {
  res.send(req.user);
};

// Get user permission controller
const getUserPermissionCtrl = async (req, res) => {
  const userEmail = req.params.email;
  const userPerm = await models.getPerm(userEmail);

  if (userPerm === undefined) {
    res.send("There is no user with this email!");
  } else {
    res.status(200).send(userPerm);
  }
};

// Logs in user
const loginUserCtrl = async (req, res) => {
  const userData = req.body;

  const result = await models.loginUser(userData);

  res.send(result);
};

// Add user controller
const addUserCtrl = async (req, res) => {
  const userData = req.body;

  const result = await models.addUser(userData);

  res.send(result)
};

// Update user controller
const updateUserEmailCtrl = async (req, res) => {
  const userEmail = req.params.email;
  const newEmail = req.body.email;

  const result = await models.updateEmail(userEmail, newEmail);

  if (result === false) {
    res.send("User with this email doesn't exist!");
  } else {
    res.status(200).send("User email has been changed!");
  }
};

// Delete user controller
const deleteUserCtrl = async (req, res) => {
  const userEmail = req.params.email;

  const result = await models.deleteUser(userEmail);

  if (result === undefined) {
    res.send("No user with this email exists!");
  } else {
    res.status(200).send("User deleted successfully!");
  }
};

const updateUserPasswordCtrl = async (req, res) => {
  const userEmail = req.params.email;
  const newPassword = req.body.password;

  const result = await models.updatePassword(userEmail, newPassword);

  if (result === false) {
    res.send("User with this email doesn't exist!");
  } else if (result === undefined) {
    res.send("The password should be atleast 8 characters long!");
  } else {
    res.status(200).send("The password updated successfully!");
  }
};

module.exports = {
  getUserDataCtrl,
  addUserCtrl,
  updateUserEmailCtrl,
  deleteUserCtrl,
  updateUserPasswordCtrl,
  getUserPermissionCtrl,
  loginUserCtrl,
};
