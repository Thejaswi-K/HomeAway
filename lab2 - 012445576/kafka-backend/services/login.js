var mysql = require('mysql');
var crypt = require('../db/crypt');




exports.userService = function userService(msg, callback){
    switch(msg.path){
        
        case "getownerproperties":
            getOwnerProperties(msg, callback);
            break;
    }
};

function getOwnerProperties(msg, callback){
    Properties.find({'username': req.params.username}, function (err, property) {
      if (err) {
          throw err;
      }
      else {
          if(property){
              res.writeHead(200, {
                "Content-Type": "application/json"
              });
              res.end(JSON.stringify(property));  
              callback(null, res);   
          }
          else{
              throw err;
          }
      }
    });
}

function signup(msg,callback) {

    mongo.connect(mongoURL, function (err, db) {
        if(err)
            console.log(err);
        else{
            //console.log("in db");
            db.collection('users').findOne({"email":msg.email})
                .then((doc) => {
                    var res = "";
                    if(doc != null){
                        res = "User is already Registered!..Login";
                        callback(null, res);
                    }
                    else{
                        db.collection('users').insertOne({
                            name: msg.name,
                            email: msg.email,
                            password: bcrypt.hashSync(msg.password, 10),
                            skills:[],
                            total_fund:0,
                            transaction_history:[]
                        });
                        res = "SignUp Successful";
                        callback(null, res);
                    }
                });
        }
    });
}


//exports.handle_request = handle_request;