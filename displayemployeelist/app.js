const express = require('express');
const app = express();
const request = require('request');
const PORT = 3000;

const empurl = "http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees";

app.get('/',(req,res)=>{

    request({
        url: empurl,
        json: true
    },(err,body)=>{
        var json = [];
        //console.log(body.body);
        for(var s in body.body){
            var element = {};
            element.id = body.body[s].id;
            element.name = body.body[s].name;
            element.createdAt = body.body[s].createdAt;
            json.push(element);
        }
        res.send(json);
    })
})

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log('Err in api call');
    }else{
        console.log('App is running on PORT ' + PORT);
    }
    
})