var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema       = mongoose.Schema;

var options = {
    // useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 20, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};
mongoose.connect('mongodb://tejuconan:abc123@ds133113.mlab.com:33113/homeaway', options);
var Traveller = new Schema({
    firstname :{
        type : String
    },
    lastname : {
        type : String
    },
    email :{
        type: String
    },
    username :{
        type: String
    },
    password :{
        type: String
    }
});

module.exports =  mongoose.model('Traveller',Traveller);