const User = require("../models/Auth.model");

async function createUser(name, email, password) {
    if (!name || !email || !password) {
        throw new Error('All fields are required');
    }
    const hashedPassword = await User.hashPassword(password);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return user;
}

module.exports = { createUser };