var express = require("express");

var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.post("/calculate", function(req, res) {
    let result = 0;
    //console.log(req.body);
    result = eval(req.body.exp)
    res.send({"exp" : result})
});
app.listen(3001);
console.log("running index.js")