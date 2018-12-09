var chai = require("chai"), chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Check pass case for traveler login", function(done){
    chai.request('http://localhost:3001')
    .post('/logintraveller')
    .send({ "username": "traveler", "password" : "traveler"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})