const express = require("express");
const { createUser, findUsers, deleteUser, updateUsers, getUsers, login } = require("../controllers/userControllers");
const router = express.Router();
router.use(express.json());

// allow url encoding
router.use(express.urlencoded({ extended: true }));

// http methods
router.post("/createuser", createUser);
//get users
router.get("/finduser/:id", findUsers);
// update user
router.put("/updateuser/:id", updateUsers);
// delete user
router.delete("/deleteuser/:id", deleteUser);
// get all users
router.get("/allusers", getUsers);
// login
router.post("/login", login);

module.exports = router;
