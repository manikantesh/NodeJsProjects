const express = require('express')
const axios = require('axios')

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8080

const app = express()

app.listen(PORT,HOST,()=>{
    console.log('Server started on port: ',PORT)
})

app.get('/',(req,res)=>{
    res.send("API endpoint: /getGithubUser/:userid")
})

app.get('/getGithubUser/:uid',(req,res)=>{
    const uid = req.params.uid
    const githubUrl = `https://api.github.com/users/${uid}` 
    axios.get(githubUrl).then(response=>{
        const resJson = response.data;
        return res.status(200).json({source:'Docker Micro',...resJson,})
    })
    
    .catch(err=>{return res.json(err)})
})