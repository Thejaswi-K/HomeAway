var chai = require("chai"), chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Property details checking", function(done){
    chai.request('http://localhost:3001')
    .get('/getpropertydetails/5bdfb9a3dec10341b44dba87')
    .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
});