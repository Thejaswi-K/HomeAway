//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var mysql = require('mysql');
var pool = require('./pool');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post('/logintraveller',function(req,res){
    console.log("Inside Login Post Request");
    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT * FROM travellertable WHERE username = " + mysql.escape(username) + " and password = " + mysql.escape(password);
    console.log(sql);

    pool.getConnection(function(err,con){
        if(err){
            console.log("inside login if")
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            console.log("inside login else")
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    if (result.length != 0) {
                        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    }
                    req.session.user = result;
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Successful Login");
                }
            });
        }
    });
    
});
app.post('/createtraveller',function(req,res){
    pool.getConnection(function(err,con){
        if(err){
            console.log("inside login if")
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            console.log("Inside Create Request Handler");
            var sql = "INSERT INTO travellertable VALUES ( " + 
            mysql.escape(req.body.firstname) + " , " + mysql.escape(req.body.lastname) + " , "+
            mysql.escape(req.body.email) + "," + mysql.escape(req.body.username) + "," + mysql.escape(req.body.password) + " ) ";
            console.log("inside create: ",sql);
            con.query(sql,function(err,result){
                if(err){
                    console.log("inside create, if");
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Error While Creating traveller");
                }else{
                    console.log("inside create, else");
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end('traveller Created Successfully');
                }
            });
        }
    });
});
app.post('/loginowner',function(req,res){
    console.log("Inside Login Post Request");
    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT * FROM ownertable WHERE username = " + mysql.escape(username) + " and password = " + mysql.escape(password);
    console.log(sql);

    pool.getConnection(function(err,con){
        if(err){
            console.log("inside login if")
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            console.log("inside login else")
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    console.log(result);
                    console.log("inside else inside else")
                    if (result.length != 0) {
                        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    }
                    req.session.user = result;
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Successful Login");
                }
            });
        }
    });
    
});
app.post('/createowner',function(req,res){
    pool.getConnection(function(err,con){
        if(err){
            console.log("inside login if")
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            console.log("Inside Create Request Handler");
            var sql = "INSERT INTO ownertable VALUES ( " + 
            mysql.escape(req.body.firstname) + " , " + mysql.escape(req.body.lastname) + " , "+
            mysql.escape(req.body.email) + "," + mysql.escape(req.body.username) + "," + mysql.escape(req.body.password) + " ) ";
            console.log("inside create: ",sql);
            con.query(sql,function(err,result){
                if(err){
                    console.log("inside create, if");
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Error While Creating traveller");
                }else{
                    console.log("inside create, else");
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end('traveller Created Successfully');
                }
            });
        }
    });
});

app.listen(3001);
console.log("Server Listening on port 3001");