const express = require("express");


const bcrypt = require('bcrypt');
const signupRouter = express.Router();

const { signupModel } = require('../models/signup.model');

// ===================== CRUD OPERATION =======================
// ========= Signup Part ================
signupRouter.post("/", async (req, res) => {
    const { name, age, email, password } = req.body;
    const isUser = await signupModel.findOne({ email: email })
    if (isUser) {
        return res.send({
            msg: "Email already registered, Try Login?"
        })
    }
    bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
            return res.send({
                msg: 'Something got wrong'
            })
        }
        const newUser = new signupModel({
            name,
            age,
            email,
            password: hash,
        })
        await newUser.save();
        return res.send({
            msg: "Sign up successfull"
        })
    })
})


module.exports = {
    signupRouter
}
