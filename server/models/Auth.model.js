const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        select: false
    },
    verified: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1y' })
    return token;
}
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model("User", UserSchema);