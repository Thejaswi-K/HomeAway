var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Traveler details checking", function(done){
    chai.request('http://localhost:3001')
    .get('/gettravellerdetails/traveler')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
});