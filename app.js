let express = require("express")
let app = express()
let port = (process.env.PORT||8080)
let route = require("./routing/index");
const bodyParser = require('body-parser')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
let dbInfo =  require("./db-connection.json")
const url = `${dbInfo.host}:${dbInfo.port}/${dbInfo.database}`;
app
    //Headers
    .disable('x-powered-by')
    .use( (req, res, next) => {
        res.header('Access-Control-Allow-Origin',  '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization');
        next()
    })
    .use(cookieParser())
    .use(morgan("tiny"))
    .use(bodyParser.urlencoded({extended: true}))
    .use(bodyParser.json({limit:"10000000000kb"}))
    .use('/', route);


console.log(url)
mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.info("Database connection stablished");
    app.listen(port, () => {
        console.info('App listening on port 8080!');
    });
}).catch((err) => {
    throw err;
});



module.exports = app;