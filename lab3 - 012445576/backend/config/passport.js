'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var config = require('./settings');
const mongoClient = require('mongodb').MongoClient;
// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        mongoClient.connect(
            "mongodb://tejuconan:abc123@ds133113.mlab.com:33113/homeaway",
            (err,client) => {
                if(err) {
                    console.log("failed to connect to MOngo Db");
                    res.code = "400";
                    res.value =
                      "failed connecting to mongo.";
                    console.log(res.value);
                    res.sendStatus(400).end();
                }
                else{
                    const db = client.db("config");
                    console.log("jwt payload username:", jwt_payload.username);
                    db.collection("owners").findOne({username:jwt_payload.username},function(res){
                       var user = res;
                       callback(null,user);

                    },function (err) {
                        return callback(err, false);
                    });

                }
            }
        )

    }));
};
