const express = require('express');
const app = express();
const request = require('request');
const PORT = 5400;

const weatherurl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=5&appid=ecb0b217a1d00afdc6d6127edfa02390";


//Static file Path
app.use(express.static(__dirname+'/public'));
//Html or rendering Path
app.set('views','./src/views');
//Vuew engine specified
app.set('view engine','ejs')

function getWeather(url){
    var options = {
        url:weatherurl,
        headers:{
            'User-Agent':'request'
        }
    };

    return new Promise(function(resolve,reject){
        request.get(options,function(err,resp,body){
            if(err){
                reject(err);
            }else{
                resolve(body);
            }
        })
    })
}

app.get('/',(req,res)=>{
    res.send('API is working');
})

app.get('/weather',(req,res)=>{
    var dataPromise = getWeather();
    dataPromise.then(JSON.parse)
                .then (function(result){
                    res.render('main',{result,title:'***weather App***'})
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