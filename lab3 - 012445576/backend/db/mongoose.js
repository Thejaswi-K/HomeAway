var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://tejuconan:Doomofdoom1@ds133113.mlab.com:33113/homeaway');

module.exports = {mongoose};