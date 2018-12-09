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
var crypt = require("./db/crypt");
var jwt = require("jsonwebtoken")
var passport = require("passport");
var config = require("./config/settings");
var requireAuth = passport.authenticate("jwt", {session: false});
require("./config/passport")(passport);
app.use(passport.initialize());
var Travellers = require('./models/travellers.js');
var Owners = require('./models/owners.js');
var Trip = require('./models/trips.js');
var Properties = require('./models/properties.js');
const multer = require("multer");
const path = require("path");
const fs = require("fs");
var kafka = require('./kafka/client');
const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, "./uploads");
    
  },
  filename: (req, file, cb) => {
    
    const newFilename = Date.now()+`${path.extname(file.originalname)}`;
    cb(null, newFilename);
   
  }
});
const upload = multer({ storage });

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

//var {mongoose} = require('./db/mongoose');
const mongoClient = require('mongodb').MongoClient;
app.post('/logintraveller',function(req,res){
    console.log("inside traveler login")
    var username=req.body.username;
    var password=req.body.password;
    console.log(req.body.username, password);
    Travellers.findOne({'username':username}, function (error, traveller) {
      console.log(traveller);
      crypt.compareHash(password,traveller.password,function(err,isMatch){
        if(isMatch&&!err){
          console.log("login successful....", traveller.password);
          console.log("User Details username",traveller.username);
          if (traveller.length != 0) {
              res.cookie('traveller',username,{maxAge: 900000, httpOnly: false, path : '/'});
          }
          // req.session.user = result;
          res.writeHead(200,{
            'Content-Type' : 'text/plain'
          })
          res.end("valid Credentials");   
        }
        else{
          console.log('error' );
          res.writeHead(400,{
            'Content-Type' : 'text/plain'
           })
          res.end("Invalid Credentials");
        }
      })
  });
});

app.post('/createtraveller',function(req,res){
  var reqPassword = req.body.password;
  var reqUsername = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  crypt.createHash(reqPassword,
  function(resp){
    hashedPassword = resp;
    Travellers.findOne({'username':reqUsername},function(err,traveller){
      if(err){
          throw err;
      }
      else if(traveller){
          res.status = 401;
          console.log("db user",traveller);
          res.message= 'This owner already exists';
          console.log("401 username");
      }
      else{
          var newUser = new Travellers();
          newUser.username = reqUsername;
          newUser.email = email;
          newUser.password= hashedPassword;
          newUser.firstname = firstname;
          newUser.lastname = lastname;
          console.log("new user save");      
          newUser.save(function(err){
              if(err)
                throw err;
              else{
                console.log("user saved"); 
                res.writeHead(200, {
                  "Content-Type": "text/plain"
                });
                res.end("Traveller created Successfully");               
              }
          });
      }
  });
  },function(err){
    console.log(err);
    failureCallback();
  });    
});

app.post('/loginowner',function(req,res){
    console.log("inside owner login")
    var username=req.body.username;
    var password=req.body.password;
    console.log(req.body.username, password);
    Owners.findOne({'username':username}, function (error, owner) {
          console.log(owner);
          crypt.compareHash(password,owner.password,function(err,isMatch){
            if(isMatch&&!err){
              console.log("login successful....", owner.password);
              console.log("User Details username",owner.username);
              //var token = jwt.sign({username},config.secret, { expiresIn:900000})
              if (owner.length != 0) {
                  res.cookie('owner',username,{maxAge: 900000, httpOnly: false, path : '/'});
              }
              // req.session.user = result;
              res.writeHead(200,{
                'Content-Type' : 'text/plain'
              })
              res.end("valid Credentials");   
            }
            else{
              console.log('error' );
              res.writeHead(400,{
                'Content-Type' : 'text/plain'
               })
              res.end("Invalid Credentials");
            }
          })
    });
});

app.post('/createowner',function(req,res){    
    var reqPassword = req.body.password;
    var reqUsername = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    crypt.createHash(reqPassword,
      function(resp){
        hashedPassword = resp;
        Owners.findOne({'username':reqUsername},function(err,owner){
          if(err){
              throw err;
          }
          else if(owner){
              res.status = 401;
              console.log("db user",owner);
              res.message= 'This owner already exists';
              console.log("401 username");
          }
          else{
              var newUser = new Owners();
              newUser.username = reqUsername;
              newUser.email = email;
              newUser.password= hashedPassword;
              newUser.firstname = firstname;
              newUser.lastname = lastname;
              console.log("new user save");      
              newUser.save(function(err){
                  if(err)
                    throw err;
                  else{
                    console.log("user saved"); 
                    res.writeHead(200, {
                      "Content-Type": "text/plain"
                    });
                    res.end("Owner created Successfully");               
                  }
              });
          }
      });
      },function(err){
        console.log(err);
        failureCallback();
      });
});

app.post('/createproperty',function(req,res){
    
  var newProperty = new Properties();
  newProperty.username = req.body.username;    
  newProperty.location = req.body.location;    
  newProperty.headlines = req.body.headlines;    
  newProperty.description = req.body.description;    
  newProperty.accomodation = req.body.accomodation;    
  newProperty.bathrooms = req.body.bathrooms;    
  newProperty.bedrooms = req.body.bedrooms;
  newProperty.propertytype = req.body.propertyType;
  newProperty.bookingoption = req.body.bookingOption;
  newProperty.availabilityfrom = req.body.availabilityFrom;  
  newProperty.availabilityto = req.body.availabilityTo;  
  newProperty.price = req.body.price; 
  //newProperty.photo1 = req.body.photo1;
  console.log("new user save");
  newProperty.save(function(err){
    if(err)
      throw err;
    else{
      console.log("inside create, else");
      res.writeHead(200,{
        'Content-Type' : 'text/plain'
      })
      res.end('property Created Successfully');
    }   
  });
});

app.get("/getownerproperties/:username", function(req, res) { 
    kafka.make_request('login_topic',{"path":"getownerproperties", "username":req.params.username}, function(err,results){
      if(err){
          res.send(err);
      }
      else
      {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(results);
          //res.send(results);
      }
  });
  // Properties.find({'username': req.params.username}, function (err, property) {
  //   if (err) {
  //       throw err;
  //   }
  //   else {
  //       if(property){
  //           res.writeHead(200, {
  //             "Content-Type": "application/json"
  //           });
  //           res.end(JSON.stringify(property));  
  //           //callback(null, res);   
  //       }
  //       else{
  //           throw err;
  //       }
  //   }
  // });
});
  var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : "homeaway",
  port: '3306'
});

  app.get("/getownerdetails/:username", function(req, res) {
    kafka.make_request('login_topic',{"path":"getownerdetails", "username":req.params.username}, function(err,results){
      if(err){
          res.send(err);
      }
      else
      {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(results);
          //res.send(results);
      }
    });
    // Owners.find({'username': req.params.username}, function (err, owner) {
    //   if (err) {
    //       throw err;
    //   }
    //   else {
    //       if(owner){
    //           res.writeHead(200, {
    //             "Content-Type": "application/json"
    //           });
    //           res.end(JSON.stringify(owner));     
    //       }
    //       else{
    //           throw err;
    //       }
    //   }
    // });
  
});


  app.get("/gettravellerdetails/:username", function(req, res) {
    kafka.make_request('login_topic',{"path":"gettravelerdetails", "username":req.params.username}, function(err,results){
      if(err){
          res.send(err);
      }
      else
      {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(results);
          //res.send(results);
      }
    });
    // Travellers.find({'username': req.params.username}, function (err, userProfile) {
    //     if (err) {
    //         throw err;
    //     }
    //     else {
    //         if(userProfile){
    //             res.writeHead(200, {
    //               "Content-Type": "application/json"
    //             });
    //             res.end(JSON.stringify(userProfile));     
    //         }
    //         else{
    //             throw err;
    //         }
    //     }
    // });
  });

app.post("/travellerprofileedit", function(req, res) {
    var data = req.body;
    console.log("username is ", data.username);
    Travellers.update({'username':data.username}, {'firstname':data.firstname,'lastname':data.lastname,'email':data.email,'gender':data.gender,'phonenumber':data.phonenumber,'aboutme':data.aboutme,'country':data.country,'company':data.company,'school':data.school,'hometown':data.hometown,'languages':data.languages,'profileimage':data.profileimage,'city':data.city}, function (err) {
        if(err){
            console.log(err);
            res.writeHead(400, {
              "Content-Type": "text/plain"
            });
            res.end("Could Not Get Connection Object");
        }
        else
        {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end("success");
        }
    });
  });

  app.post("/searchresults", function(req, res) {
    Properties.find({'location': req.body.location,'accomodation':req.body.guest,'availabilityfrom':{$lt : req.body.arrive},'availabilityto':{$gt : req.body.depart}}, function (err, searchdetails) {
      if (err) {
          throw err;
      }
      else {
          if(searchdetails){
              res.writeHead(200, {
                "Content-Type": "application/json"
              });
              res.end(JSON.stringify(searchdetails));     
          }
          else{
              throw err;
          }
      }
    });
  });

  app.get("/getpropertydetails/:propertyid", function(req, res) {
    
    kafka.make_request('login_topic',{"path":"getpropertydetails", "propertyid":req.params.propertyid}, function(err,results){
      if(err){
          res.send(err);
      }
      else
      {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          res.end(results);
          //res.send(results);
      }
    });
    // Properties.find({'_id': req.params.propertyid}, function (err, propdetails) {
    //   if (err) {
    //       throw err;
    //   }
    //   else {
    //       if(propdetails){
    //           res.writeHead(200, {
    //             "Content-Type": "application/json"
    //           });
    //           res.end(JSON.stringify(propdetails));     
    //       }
    //       else{
    //           throw err;
    //       }
    //   }
    // });
  });

  app.post("/bookproperty", function(req, res) {
    
    var newBooking = new Trip();
    newBooking.bookername = req.body.username;    
    newBooking.fromdate = req.body.from;    
    newBooking.todate = req.body.to;    
    newBooking.propertyid = req.body.propertyid;    
    
    //newProperty.photo1 = req.body.photo1;
    console.log("new user save");
    newBooking.save(function(err){
      if(err)
        throw err;
      else{
        console.log("inside create, else");
        res.writeHead(200,{
          'Content-Type' : 'text/plain'
        })
        res.end('Booking Created Successfully');
      }   
    });
  });

  app.get("/gettravellertrips/:username", function(req, res) {
    // var sql =
    //   "SELECT triptable.fromdate, triptable.todate, propertytable.* FROM triptable INNER JOIN propertytable ON triptable.propertyid = propertytable.propertyid WHERE triptable.bookername =" +
    //   mysql.escape(req.params.username);
    // console.log("sql query is ", sql);
    // pool.getConnection(function(err, con) {
    //   if (err) {
    //     res.writeHead(400, {
    //       "Content-Type": "text/plain"
    //     });
    //     res.end("Could Not Get Connection Object");
    //   } else {
    //     con.query(sql, function(err, result) {
    //       if (err) {
    //         res.writeHead(400, {
    //           "Content-Type": "text/plain"
    //         });
    //         res.end("Could Not Get Connection Object");
    //       } else {
    //         if (result < 1) {
    //           console.log("result empty");
    //           res.end("result is empty");
    //         } else {
    //           res.writeHead(200, {
    //             "Content-Type": "application/json"
    //           });
    //           console.log(JSON.stringify(result));
    //           res.end(JSON.stringify(result));
    //         }
    //       }
    //     });
    //   }
    // });

    
    Trip.aggregate([{$lookup:{
      "from": "properties",
      "localField": "propertyid",
      "foreignField":"_id",
      "as": "trips"
      
    }}]).exec(function(err, tripdetails){
      console.log(tripdetails);
      res.end(JSON.stringify(tripdetails));
    })
  });

  app.post("/uploadpp", upload.single("PP"), (req, res) => {
    
    res.send(req.file.filename);
  });
  
  
  app.post("/uploadphoto", upload.array("image",7), (req, res) => {
    res.send(req.files);
  });
  
  app.post("/download/:file(*)", (req, res) => {
    var file = req.params.file;
    var fileLocation = path.join(__dirname + "/uploads", file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString("base64");
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(base64img);
  });

app.listen(3001);
app.get('/protectedRoute', requireAuth, function (request, response) {
  response.send('Your User id is: ' + request.user.id + ', username is: ' + request.user.username + '.');
});
console.log("Server Listening on port 3001");