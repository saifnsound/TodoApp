var mongoose = require("mongoose");
mongoose.set('debug', true);
var url = process.env.databaseurl || "mongodb: //localhost/todoapi"
mongoose.connect(url);

mongoose.Promise = Promise;

module.exports.Todo = require("./todo");