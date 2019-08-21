let supertest = require("supertest");
let should = require("should");
let sinon = require("sinon");
let server = supertest.agent("http://localhost:8080");
let Mails = require("../controlers/MailsManager");
let AuthenticationManager = require("../controlers/AuthenticationManager");
let jwt = require("jsonwebtoken");

describe ("Enpoint test", () => {

    it("test get 404 not found", () => {
        server
            .get("/dsd3eede")
            .expect("Content-type",/json/)
            .expect(404)
            .end(function(err,res){
                should(res.status).be.equal(404)
            });
    })


    it('test get mails api without token', function () {
        server
            .get("/api/getMails")
            .expect("Content-type",/json/)
            .expect(500)
            .end(function(err,res){
                should(res.status).be.equal(500)
            });
    });
;

    it('test create user api without token', function () {
        server
            .post("/api/createUserLogin")
            .expect("Content-type",/json/)
            .expect(500)
            .end(function(err,res){
                should(res.status).be.equal(500)
            });
    });


    it('test get filters api without token', function () {
        server
            .post("/api/getFilters")
            .expect("Content-type",/json/)
            .expect(500)
            .end(function(err,res){
                should(res.status).be.equal(500)
            });
    });


    it('test save mails api without token', function () {
        server
            .post("/api/saveMails")
            .expect("Content-type",/json/)
            .expect(500)
            .end(function(err,res){
                should(res.status).be.equal(500)
            });
    });

    it('test save filters  api without token', function () {
        server
            .post("/api/saveFilter")
            .expect("Content-type",/json/)
            .expect(500)
            .end(function(err,res){
                should(res.status).be.equal(500)
            });
    });


} );