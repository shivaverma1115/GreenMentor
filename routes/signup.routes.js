const express = require("express");


const bcrypt = require('bcrypt');
const signupRouter = express.Router();

const { signupModel } = require('../models/signup.model');

// ===================== CRUD OPERATION =======================
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

// ------------------------ READ --------------------------

signupRouter.get('/:_adminId', async (req, res) => {
    const { name, email, sort, order,limit } = req.query;

    let query = {};
    if (name) {
        query.name = { $regex: name, $options: "i" };
    }
    if (email) {
        query.email = { $regex: email, $options: "i" };
    }

    let sortOption = {};
    if (sort) {
        if (order === "asc" || order === "desc") {
            sortOption[sort] = order === "asc" ? 1 : -1;
        }
    }

    const users = await signupModel.find(query).limit(limit).sort(sortOption);
    return res.status(200).send(users)
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
