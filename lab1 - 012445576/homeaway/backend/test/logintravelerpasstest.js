var chai = require("chai"), chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code true for traveler", function(done){
    chai.request('http://localhost:3001')
    .post('/loginowner')
    .send({ "username": "traveller", "password" : "traveller"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})