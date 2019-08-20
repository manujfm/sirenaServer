const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    userid: String,
    mailsid: String,
    filter: String,
});

module.exports = mongoose.model("Filter", userSchema);