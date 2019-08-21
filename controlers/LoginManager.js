"use strict";
let jwtSecret = require("../jwt.json");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
/**
 * @description obtiene un usuario
 * @param user {string} nombre de usuario
 * @return  {object} Object user
 **/
const getUser = async function ( user ){
	let data = User.find({username: user});
	return data.exec()
};
/**
 * @description Crea un usuarioen la base de datos
 * @param userInfo {object} informacion del usuario
 * @return  {object} Object user
 **/
const createUser = async function ( userInfo ){
	return new User(userInfo);
};

/**
 * @description Contiene toda la logica del login
 **/
let loginManager = () => {};

/**
 * @description contienen la logica del login
 * @param req {Object} request de la peticion
 * @return res {Object} response de la peticion
 **/
loginManager.login = async (req, res, next) => {
	let user = await getUser(req.body.username);
	if ( user && user.length > 0 ){ //Verifica si el usuario que exista
		user = user[0];
		let resBcryp = await bcrypt.compare(req.body.password, user.password); //Verifica quye la contraseña este correcta
		if ( resBcryp ) {
			const token = jwt.sign({user: req.body.user}, jwtSecret.secret, {expiresIn: jwtSecret.expires}); //Crea el token jwt
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
/**
 * @description recibe un a contraseña y la devuelve hashea
 * @param req {Object} request de la peticion
 * @return res {Object} response de la peticion
 **/
loginManager.genHashPassword = async (req, res, next) => {
	let { password } = req.body;
	let hash  = await bcrypt.hash(password , 10);
	if ( hash ) {
		res.send({ok: true, hash}).end()
	}
	res.send({ok:false, error:"CANTGENERATYE"})
};

/**
 * @description genera un usuario nuevo
 * @param req {Object} request de la peticion
 * @return res {Object} response de la peticion
 **/
loginManager.createLoginUser = async (req, res, next) => {
	let user = await getUser(req.body.user);
	if ( user && user.length === 0 ){ //Verifica que no exista
		let hash = await bcrypt.hash(req.body.password , 10); //haseha la contraseña
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