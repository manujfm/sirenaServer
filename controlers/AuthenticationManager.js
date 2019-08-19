"use strict"
let jwtSecret = require("../jwt.json");
const jwt = require('jsonwebtoken');

function verify(req){ 
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


let AuthenticationManager = () => {};

AuthenticationManager.verifyToken = (req, res) => {
    let VERIFY_RESPONSE = verify(req);
    res.send(VERIFY_RESPONSE)
}

AuthenticationManager.authenticateMiddleware = (req, res, next) => {    
    let response = verify(req);
    if ( !response.ok ){
        res.send(response);
        return 
    }
    next()
}


module.exports = AuthenticationManager;

