var mysql = require('mysql');
var crypt = require('../db/crypt');
var Travellers = require('../models/travellers.js');
var Owners = require('../models/owners.js');
var Trip = require('../models/trips.js');
var Properties = require('../models/properties.js');



exports.userService = function userService(msg, callback){
    switch(msg.path){
        case "getownerproperties":
            getOwnerProperties(msg, callback);
            break;
        case "getownerdetails":
            getOwnerDetails(msg, callback);
            break;
        case "gettravelerdetails":
            getTravelerDetails(msg, callback);
            break;  
        case "getpropertydetails":
            getPropertyDetails(msg, callback);
            break; 
        case "gettravelertrips":
            getTravelerTrips(msg, callback);
            break;
    }
};

function getOwnerProperties(msg, callback){
    Properties.find({'username': msg.username}, function (err, property) {
      if (err) {
          //throw err;
          callback(err,null);
      }
      else {
          if(property){
            //   res.writeHead(200, {
            //     "Content-Type": "application/json"
            //   });
            //   res.end(JSON.stringify(property));  
              callback(null, JSON.stringify(property));   
          }
          else{
              throw err;
          }
      }
    });
}

function getOwnerDetails(msg, callback){
    Owners.find({'username': msg.username}, function (err, owner) {
        if (err) {
            //throw err;
            callback(err, null);
        }
        else {
            if(owner){
                // res.writeHead(200, {
                //   "Content-Type": "application/json"
                // });
                // res.end(JSON.stringify(owner));     
                callback(err, JSON.stringify(owner))
            }
            else{
                //throw err;
                callback(err, null);
            }
        }
      });
}

function getTravelerDetails(msg,callback){
    Travellers.find({'username': msg.username}, function (err, userProfile) {
        if (err) {
            //throw err;
            callback(err,null);
        }
        else {
            if(userProfile){
                // res.writeHead(200, {
                //   "Content-Type": "application/json"
                // });
                // res.end(JSON.stringify(userProfile)); 
                callback(err, JSON.stringify(userProfile))    
            }
            else{
                //throw err;
                callback(err,null);
            }
        }
    });
}
function getPropertyDetails(msg,callback){
    Properties.find({'_id': msg.propertyid}, function (err, propdetails) {
        if (err) {
            //throw err;
            callback(err,null);
        }
        else {
            if(propdetails){
                // res.writeHead(200, {
                //   "Content-Type": "application/json"
                // });
                // res.end(JSON.stringify(propdetails));  
                callback(err, JSON.stringify(propdetails));   
            }
            else{
                //throw err;
                callback(err,null);
            }
        }
      });
}

function getTravelerTrips(msg,callback){
    Trip.aggregate([{$lookup:{
        "from": "properties",
        "localField": "propertyid",
        "foreignField":"_id",
        "as": "trips"
        
      }}]).exec(function(err, tripdetails){
        console.log(tripdetails);
        //res.end(JSON.stringify(tripdetails));
        callback(err,JSON.stringify(tripdetails));
      })
}


//exports.handle_request = handle_request;