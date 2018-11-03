var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Owner details checking", function(done) {
  chai
    .request("http://localhost:3001")
    .get("/getownerdetails/owner")
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});