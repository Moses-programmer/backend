// this is where to post the CRUD functions: create, read, update, delete, login

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");
// const User = require("../models/userModel"); // make sure you have a User schema/model



// create user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log('User already exists');
            res.status(500).json(existingUser);
        } else {
            //hash password before saving
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ name, email, password })
            console.log('User created successfully')
            res.status(200).json(newUser);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating user" })
    }
};



//Get all users
const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        console.log("Fetched users", user);
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting users" });
    }
};


// Find single user by ID
const findUsers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            console.log("User not found")
            return res.status(404).json({ error: "User not found" });

        } else {
            console.log("User found", user);
            res.status(200).json(user);
        }
    } catch (error) {
        console.log("User not found", error);
        res.status(500).json({ message: "Error finding user" });
    }

};


// Update user
const updateUsers = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            console.log("User not updated")
            response.status(404).json({ error: error.message });

        } else {
            console.log("User updated", user);
            res.status(200).json(user);
        }
    } catch (error) {
        console.log("Error updating user", error);
    }

};



// delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id, req.body);
        if (!user) {
            console.log("User not deleted");
            response.status(404).json({ error: error.message });

        } else {
            console.log("User deleted", user);
            res.status(200).json(user);
        }
    } catch (error) {
        console.log("Error deleting user", error);
    }

};




// login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if email exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });


        } else {
            console.log("User found");
            res.status(200).json(user);
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Incorrect password");
            return res.status(400).json({ error: "Incorrect password" });

        }
    } catch (error) {
        res.status(500).json({ error: err.message });
        console.log("User unsuccessful", err);
    }

};

module.exports = {
    createUser,
    getUsers,
    findUsers,
    updateUsers,
    deleteUser,
    login,
};


// function

//1. CRUD Methods (for Users)

// When building an API(e.g., in Express, Laravel, Django, etc.), you’ll commonly see these operations for users:
//
// Create User → POST / users
// Add a new user to the database.
//
// Get Users → GET / users
// Fetch all users(list).
//
// Find User(by ID) → GET / users /: id
// Fetch a specific user.
//
// Update User → PUT / users /: id(or PATCH / users /: id)
// Change user details.
//
// Delete User → DELETE / users /: id
// Remove a user from the database.
//
// Login → POST / login
// Check credentials, then return a session or token.
//



// 2. POST vs PUT vs PATCH vs DELETE vs GET
//
// These are HTTP methods(verbs) that describe the type of action:

// GET
// → Used to retrieve data
// Example: GET / users → fetch all users.
//
// POST
// → Used to create new data
// Example: POST / users → create a new user.
//
// PUT
// → Used to update / replace an existing record fully.
// Example: PUT / users / 1 → replace all fields of user with ID 1.
//
// PATCH
// → Used to partially update data(just a few fields).
// Example: PATCH / users / 1 → update only the email field.
//
// DELETE
// → Used to remove data.
// Example: DELETE / users / 1 → delete user with ID 1.



// Quick Analogy
// POST → Add a new contact.
//
// GET → Look at the contact list.
//
// PUT → Replace the entire contact (all details).
//
// PATCH → Just change their phone number.
//
// DELETE → Remove the contact.