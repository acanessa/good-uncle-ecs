/*
Basic nodejs app to test API integration with Amazon Elastic Container Services.
The app will show running tasks, EC2 running instances and allow to change the desired count in a service.
*/


var express = require('express');
var app = express();
var os = require("os");
var cmd=require('node-cmd');



//LIST THE RUNNING TASKS
app.get('/api/list-task', function (req, res) {
    
    cmd.get(
        'aws ecs list-tasks --cluster default',
        function(data){
            res.setHeader('Content-Type', 'application/json');    
            res.send(JSON.stringify({response:data},2,3));    
        }
    );
    
});

//LIST THE RUNNING EC2 INSTANCES
app.get('/api/ec2', function (req, res) {
    
    cmd.get(
        'aws ecs list-container-instances --cluster default',
        function(data){
            res.setHeader('Content-Type', 'application/json');    
            res.send(JSON.stringify({response:data},2,3));    
        }
    );
    
});

//SEND ECS THE UPDATE DECIRED COUNT
app.get('/api/update/:count', function (req, res) {
    var count = req.params.count;
    console.log('Update service:' + count);
    cmd.get(
        'aws ecs update-service --service service-1 --desired-count ' + count,
        function(data){
            //res.setHeader('Content-Type', 'application/json');    
            //res.send(JSON.stringify({response:'ok'},2,3));    
        }
    );
    
});

app.get('/api/ec2/status', function (req, res) {
    var count = req.params.count;
    console.log('Update service:' + count);
    cmd.get(
        ' aws ec2 start-instances --instance-ids i-5236674a i-c45200dc',
        function(data){
            res.setHeader('Content-Type', 'application/json');    
            res.send(JSON.stringify({response:data},null,1));    
        }
    );
    
});





app.get('/',function(req,res){
       
     res.sendFile(__dirname + '/index.html');

});

app.listen(8100);
console.log('Amazon API app running!');