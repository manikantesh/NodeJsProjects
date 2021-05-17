const express = require('express');
const request = require('request');
const fs = require('fs');
const { Console } = require('console');
const fetch = require("node-fetch");
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
            var employees = JSON.parse(data);
            for(var s in employees.Employees){
                if(employees.Employees[s].id == idx){
                    res.send(employees.Employees[s]);
                }
            }
           // const requiredRecord = employees.find(employees => employees.id === idx)
        }
    })
})

app.get('/project/:id',(req,res,next)=>{
    var idx = req.params.id;
    fs.readFile('./jsondata/projects.json','utf8',(err,data)=>{
        if(err){
            res.send('Error');
        }else{
            var project = JSON.parse(data);
            for(var s in project.Projects){
                if(project.Projects[s].projectId == idx){
                    res.send(project.Projects[s]);
                }
            }
        }
    })
})

function readProject(idx){
    fs.readFile('./jsondata/projects.json','utf8',(err,data)=>{
            var project = JSON.parse(data);
            for(var s in project.Projects){
                if(project.Projects[s].projectId == idx){
                    var st = project.Projects[s];
                    return st;
                }
            }
    })
}

app.get('/getemployeedetails', (req,res,next)=>{
    fs.readFile('./jsondata/employee.json','utf8', async (err,data)=>{
        if(err){
            res.send('Error');
        }else{
            var json = [];
            var employees = JSON.parse(data);
            for(var s in employees.Employees){
                var element = {};
                element.id = employees.Employees[s].id;
                element.name = employees.Employees[s].name;
                element.details = employees.Employees[s].details;
                if(employees.Employees[s].projectId != ''){
                    var jsont = [];
                    var projectData = employees.Employees[s].projectId;
                    for(var k in projectData){                       
                        var idx = projectData[k];
                        var st = await fetch('http://localhost:3000/project/' + idx ).then(response => response.json());
                        jsont.push(st);
                    }
                    element.project = jsont;
                }
                json.push(element);
            }
        res.send(json);
        }
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