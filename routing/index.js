let express = require("express");
let app = express.Router();
let loginManager = require("../controlers/LoginManager");
let authenticationManager = require("../controlers/AuthenticationManager");
let mailsManager = require("../controlers/MailsManager");
let filterManager = require("../controlers/FilterManager");


/*Routing*/
app

    .post("/api/genHashPassword", loginManager.genHashPassword)

    .post("/api/login", loginManager.login)

    .post("/api/createUserLogin", authenticationManager.authenticateMiddleware, loginManager.createLoginUser)

    .get("/api/getMails", authenticationManager.authenticateMiddleware, mailsManager.getMails)

    .get("/api/getFilters", authenticationManager.authenticateMiddleware, filterManager.getFilters)

    .post("/api/saveMails", authenticationManager.authenticateMiddleware, mailsManager.saveMails)

    .post("/api/saveFilter", authenticationManager.authenticateMiddleware, filterManager.saveFilter)

    .get("/api/verifySessionID", authenticationManager.verifyToken);





module.exports = app;