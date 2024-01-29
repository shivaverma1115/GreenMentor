const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
    name: { type: String },
    age: { type: Number, require },
    email: { type: String, require },
    password: { type: String, require },
})

const signupModel = mongoose.model('signup', signupSchema);

module.exports = {
    signupModel
}