const express = require("express");


const bcrypt = require('bcrypt');
const signupRouter = express.Router();

const { signupModel } = require('../models/signup.model');

// ===================== CRUD OPERATION =======================
// ------------------------ READ --------------------------

signupRouter.get('/:_email', async (req, res) => {
    const users = await signupModel.findOne({ email: req.params._email });
    return res.status(200).send(users)
})


// ------------------------ CREATE --------------------------
signupRouter.post("/", async (req, res) => {
    const { name, age, email, password } = req.body;
    const isUser = await signupModel.findOne({ email: email })
    if (isUser) {
        return res.send({
            msg: "Email already registered, Try Login?",
            payload:false 
        })
    }
    bcrypt.hash(password, 3, async (err, hash) => {
        if (err) {
            return res.status(500).send({
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
            msg: "Sign up successfull",
            payload:true
        })
    })
})


// ------------------------ EDIT --------------------------

signupRouter.put('/:id', async (req, res) => {
    try {
        const user = await signupModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        if (user) {
            res.send({
                msg: "Updated Successfully",
                user: user
            });
        } else {
            res.status(404).send({ msg: "User not found" });
        }
    } catch (error) {
        console.log(error);
    }
})

// ------------------------ DELETE --------------------------

signupRouter.delete('/:_id', async (req, res) => {
    const user = await signupModel.findOneAndDelete({ _id: req.params._id })
    if (user) {
        return res.status(200).send({
            msg: "Delete Successfully"
        })
    }
    return res.status(404).send({
        msg: "Please try again later"
    });
})


module.exports = {
    signupRouter
}
