const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    password: String
});

module.exports = mongoose.model("User", userSchema);