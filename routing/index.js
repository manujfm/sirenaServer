let express = require("express");
let app = express.Router();
let loginManager = require("../controlers/LoginManager");
let authenticationManager = require("../controlers/AuthenticationManager");


/*Routing*/
app

    .post("/api/genHashPassword", loginManager.genHashPassword)

    .post("/api/login", loginManager.login)

    .post("/api/createUserLogin", authenticationManager.authenticateMiddleware, loginManager.createLoginUser)

    .get("/api/getMails", authenticationManager.authenticateMiddleware, mailsManagers.getMails)

    .get("/api/verifySessionID", authenticationManager.verifyToken);





module.exports = app;