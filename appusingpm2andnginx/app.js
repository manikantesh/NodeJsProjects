const fs = require('fs');
const express = require('express');

const app = express();
const port = 6500;

app.get('/',(req,res) => {
    res.send('<h1>Welcome to Data Demo</h1>')
})

app.get('/getData',(req,res)=>{
    fs.readFile('./data/db.json',(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(JSON.parse(result))
        }
    })
})

app.listen(port,(err)=>{
    console.log('server is running on port'+port);
})
