"use strict"
let jwtSecret = require("../jwt.json");
const jwt = require('jsonwebtoken');

/**
 * @description Es el manejador de la authenticacion de las peticiones
 **/

let AuthenticationManager = () => {};

/**
 * @description verifica la caducidad/validez del token en el header
 * @param req {Object} request de la peticion
 * @return res {Object}
 **/

AuthenticationManager.verify = (req) => {
    let bearer = req.headers.authorization;
    if ( !bearer ) return {ok: false, error:"NOTOKEN"};
    let token = bearer.split(" ")[1];
    let res = jwt.verify(token, jwtSecret.secret, (err, decoded) => {
        if( err ){
            return {ok: false, error: "INVALIDTOKEN", err}
        }
        return {ok: true, error:""}
    });

    return res
}

/**
 * @description verifica el token de acceso
 * @param req {Object} request de la peticion
 * @param res {Object} response de la peticion
 **/

AuthenticationManager.verifyToken = (req, res) => {
    let VERIFY_RESPONSE = AuthenticationManager.verify(req);
    res.send(VERIFY_RESPONSE)
};

/**
 * @description middleware qde control de acceso a la API
 * @param req {Object} request de la peticion
 * @param res {Object} response de la peticion
 * @param next {Object}
 **/
AuthenticationManager.authenticateMiddleware = (req, res, next) => {    
    let response = AuthenticationManager.verify(req);
    if ( !response.ok ){
        res.status(500).send(response);
        return 
    }
    next()
};


module.exports = AuthenticationManager;

