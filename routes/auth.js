const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');

const User = require('../models/user');

router.post("/register", async (req, res) => {
    try {
        const {firstName, lastName, email, password, confirmPassword} = req.body;

        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }

        if (password !== confirmPassword) {
            res.status(400).send("Password is unconfirmed");
        }

        const oldUser = await User.findOne({email});


        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        const token = jwt.sign({userId: user._id}, process.env.TOKEN_KEY, {expiresIn: '2d'});
        user.token = token;

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        const user = await User.findOne({email});
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({userId: user._id}, process.env.TOKEN_KEY, {expiresIn: '2d'});
            console.log(token)
            res.status(200).json({
                "token": token,
                "userId": user._id
            });
        }
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
