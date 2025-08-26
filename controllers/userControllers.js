// create read delete methods
// post delete update g
const express = require("express");
const mongoose = require("require");
const cos = require("cors");
const bcrypt = require("bcrypt");


// create user
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await email.findOne({ email })
        if (existingUser) {
            console.log('User already exists');
            res.status(500).json(existingUser);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({ username, email, password })
            console.log('User created successfully')
            res.status(200).json(newUser);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating user" })
    }
};



// Get users
const getUsers = async (req, res) => {
    try {
        console.log("Fetched users", user);
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error getting users" });
    }
};


// Find users
const findUsers = async (req, res) => {
    try {
        const User = await User.findById(req.params.id);
        if (!user) {
            console.log("User not found")
            return res.status(404).json({ error: "User not found" });

        } else {
            console.log("User found", user);
            res.status(200).json(user);
        }
    } catch (error) {
        console.log("User not found", error);
        res.status(500).json({ message: "Error finding user"});
    }

};


// Update user
const updateUsers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, req.body);
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
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ error: "User not found" });

        } else {
            console.log("User found");
            res.status(200).json(user);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            console.log("Incorrect password");
            return res.status(400).json({error: "Incorrect password"});

        }
    } catch (error) {
        res.status(500).json({error: err.message});
        console.log("User unsuccessful", err);
    }

};

module.exports = {
    createUser,
    getUsers,
    findUser,
    updateUser,
    deleteUser,
    login,
};


// function