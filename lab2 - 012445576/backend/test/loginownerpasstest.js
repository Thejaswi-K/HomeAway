var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code true for OWNER", function(done){
    chai.request('http://localhost:3001')
    .post('/loginowner')
    .send({ "username": "owner", "password" : "admin"})
    .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
    });
})