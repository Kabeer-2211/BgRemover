const mongoose = require("mongoose");

const db = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
};

module.exports = db;