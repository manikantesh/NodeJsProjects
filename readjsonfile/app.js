const express = require('express');
const request = require('request');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.get('/',(req,res)=>{
    res.send('Start');
})

app.get('/employee/:id',(req,res,next)=>{
    var idx = req.params.id;
    fs.readFile('./jsondata/employee.json','utf8',(err,data)=>{
        if(err){
            res.send('Error');
        }else{
            const employees = JSON.parse(data);

           res.send(employees);
        }
    })
})

app.get('/project/:id',(req,res,next)=>{
    var idx = req.params.id;
    fs.readFile('./jsondata/project.json','utf8',(err,data)=>{
        if(err){
            res.send('Error');
        }else{
            const employees = JSON.parse(data);

           res.send(employees);
        }
    })
})

app.get('/getemployeedetails',(req,res,next)=>{

})

app.listen(PORT,(err)=>{
    if(err)
    {
        console.log('Err in api call');
    }else{
        console.log('App is running on PORT ' + PORT);
    }
    
})