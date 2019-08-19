const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mailSchema = new Schema({
	firstName: String,
	lastName: String,
	subject : String,
	message: String,
	mailId: Number
})

module.exports = mongoose.model("Mail", mailSchema);