/*
Basic nodejs app to test docker containers in Amazon Elastic Container Services.
The app will diplay information about the container and will log containerId in a MongoDB database.
*/

var express = require('express');
var app = express();
var os = require("os");
var mongoose     = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-app',function() {console.log('MONGO  [Connected]');});

var hostname = os.hostname();
var cpu = os.cpus();
var mem = os.freemem();
var inet = os.networkInterfaces();
var uptime = os.uptime();
var feedback = '';

var Schema = mongoose.Schema, ObjectId = Schema.ObjectID;

var InfoSchema = new Schema({
    desc:       { type: String, required: false},
    containerId:    { type: String, required: false},
    //cpu:            { type: String, required: false},
    mem:            { type: String, required: false},
    //inet:           { type: String, required: false},
    uptime:         { type: String, required: false}
});

var infoModel = mongoose.model('Info', InfoSchema);



app.get('/', function (req, res) {
    
    var info = new infoModel({
        'desc':'Docker container running a Nodejs app.',
        'containerId':hostname,
        'mem':mem,
        'uptime':uptime
    });
    
    info.save( function(error, data){
        if(error){
            console.log(error);
        }
        else{
             console.log('Mongo write [OK]');
        }
    });
    
    var info = {
        'info':'Docker container running a Nodejs app.',
        'container-id':hostname,
        'cpu':cpu,
        'free-memory':mem,
        'interfaces':inet,
        'uptime':uptime
    }    
    res.setHeader('Content-Type', 'application/json');    
    res.send(JSON.stringify(info,null,3));    
});

app.listen(80);
console.log('Node-App Running!');
