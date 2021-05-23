const express = require('express');
const axios = require('axios');
const redis = require('redis');

const port = 8080;
const app = express();
const client = redis.createClient();

client.on('error', (err) => {
    console.log(err)
})

app.get('/', (req,res)=>{
    res.send('Welcome to Express Server !')
})

app.get('/getWiki/:country',(req,res) => {
    const userinput = req.params.country;
    const url = `https://en.m.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userinput}`

    return client.get(`wiki:${userinput}`, (err, result) => {
        if(result){
            const output = JSON.parse(result);
            return res.status(200).json(output)
        } else {
            return axios.get(url)
                .then( response => {
                    const output = response.data;
                    client.setex(`wiki:${userinput}`,3600,JSON.stringify({source:'Redis',output}));
                    return res.status(200).json({source:'API',output})
                })
                .catch(err => {
                    return res.send(err)
                }) 
        }
    })
})

app.listen(port,(err)=>{
    if(err)
    {
        console.log('Err in api call');
    }else{
        console.log('App is running on PORT ' + port);
    }
    
})