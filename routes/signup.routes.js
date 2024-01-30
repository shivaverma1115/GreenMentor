const express = require("express");


const bcrypt = require('bcrypt');
const signupRouter = express.Router();

const { signupModel } = require('../models/signup.model');

// ===================== CRUD OPERATION =======================
// ------------------------ READ --------------------------

signupRouter.get('/:email', async (req, res) => {
    const users = await signupModel.findOne({ email: req.params.email }) ;
    return res.status(200).send(users)
})


// ------------------------ CREATE --------------------------
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
        return res.status(201).send({
            msg: "Sign up successfull"
        })
    })
})


// ------------------------ EDIT --------------------------

signupRouter.put('/:_id', async (req, res) => {
    const user = await signupModel.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true })
    if (user) {
        return res.send({
            msg: "Updated Successfully"
        })
    }
})

// ------------------------ DELETE --------------------------

signupRouter.delete('/:_id', async (req, res) => {
    const user = await signupModel.findOneAndDelete({ _id: req.params._id })
    if (user) {
        return res.send({
            msg: "Delete Successfully"
        })
    }
    return res.send({
        msg: "Please try again later"
    });
})


module.exports = {
    signupRouter
}
