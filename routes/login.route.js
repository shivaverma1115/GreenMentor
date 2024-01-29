const express = require('express');
const loginRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config() ;

const { signupModel } = require('../models/signup.model');

loginRoute.post("/", async (req, res) => {
    const { email, password } = req.body;
    const isUser = await signupModel.findOne({ email: email })
    if (!isUser) {
        return res.send({
            msg: 'Sign up first'
        })
    }
    bcrypt.compare(password, isUser.password, (err, result) => {
        if (err) {
            return res.send({
                msg: "Something got error, Login failed"
            })
        }
        const token = jwt.sign({ userID: isUser._id }, process.env.SECRET_KEY)
        return res.status(200).send({
            msg: "Login successfull",
            token: token
        })
    });
})


module.exports = {
    loginRoute
}
