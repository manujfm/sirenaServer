"use strict";
let jwtSecret = require("../jwt.json");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUser = async function ( user ){
	let data = User.find({username: user});
	return data.exec()
};

const createUser = async function ( userInfo ){
	return new User(userInfo);
};


let loginManager = () => {};


loginManager.login = async (req, res, next) => {
	let user = await getUser(req.body.username);
	if ( user && user.length > 0 ){
		user = user[0];
		let resBcryp = await bcrypt.compare(req.body.password, user.password);
		if ( resBcryp ) {
			const token = jwt.sign({user: req.body.user}, jwtSecret.secret, {expiresIn: jwtSecret.expires});
			const userInfo = {
				id: user.id,
				firstname: user.firstname,
				lastname: user.lastname,
				username: user.username
			};
			res.send({ok: true, token, userInfo});
			return
		}
		res.send({ok: false , error:"INVALIDPASSWORD"});
		res.end()
	}
	res.send({ok: false, error:"NOTEXISTINGUSER"})

};

loginManager.genHashPassword = async (req, res, next) => {
	let { password } = req.body;
	let hash  = await bcrypt.hash(password , 10);
	if ( hash ) {
		res.send({ok: true, hash}).end()
	}
	res.send({ok:false, error:"CANTGENERATYE"})
};


loginManager.createLoginUser = async (req, res, next) => {
	let user = await getUser(req.body.user);
	if ( user && user.length === 0 ){
		let hash = await bcrypt.hash(req.body.password , 10);
		let user  = await createUser(req.body);
		user.password  = hash;
		const resSave = await user.save();
		if ( !resSave ) res.send({ok:false, error:"CANTCREATEUSER"}).end();
		res.send({ok:true, user})
	} else {
		res.send({ ok: false, error: "EXISTINGUSER" })
	}
};




module.exports = loginManager;