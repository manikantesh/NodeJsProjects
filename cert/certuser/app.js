const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const http = require('http');


const iplocate = require("node-iplocate")
const publicIp = require('public-ip')

require('./db')
const Newslist = require('./models/news')
const Contactuslist = require('./models/contactus')

const app = express()
app.set('port', process.env.PORT || 9901);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors())

app.set('view engine', 'ejs')
app.set('views', './views')

const userloc = async ()=>{
    try{
        const ip = await publicIp.v4()
        return await iplocate(ip)    
    }catch(err){
        console.log(err)
    }
}

const getWeather = async (lon, lat) =>{
    const apikey = 'f443d734d889d6c735762b5fedab80b1'
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${apikey}&units=metric`
    try{
        return await axios.get(apiUrl)
    }catch(err){
        console.log(err)
    }
}

app.get('/', (req,res)=>{

    userloc().then((loc)=>{  
        const lon = loc.longitude
        const lat = loc.latitude
        getWeather(lon,lat).then((response)=>{
            const weather = {
                description: response.data.weather[0].main,
                icon: "http://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png",
                temperature: response.data.main.temp,
                temp_min: response.data.main.temp_min,
                temp_max: response.data.main.temp_max,
                city: response.data.name
            }

            Newslist.find({}).limit(3).sort( {insertTime: -1} ).exec( (err,data)=>{
                console.log(err)
                const news = data

                res.render('home', {
                    weather,
                    news
                })
            })
    
        })
    })
})

app.get('/sports', (req,res)=>{

    const d = new Date().toISOString()
    const today = d.substring(0,10)

    const apiUrl = 'https://newsapi.org/v2/top-headlines' 
    axios.get(apiUrl, {
            params: {
                sources: 'espn, nfl-news, the-sport-bible',
                from: today,
                sortBy: 'popularity',
                language: 'en',
                apiKey: '94fa789eaa584bbcbb2a181d58950194'
            }
        })
        .then( (response)=>{
            const data = response.data.articles
            res.render('sports', {data})
        })
        .catch(function (error) {
            console.log(error);
        })
})

app.get('/about_us', (req,res)=>{
    res.render('about_us')
})

app.get('/contact_us', (req,res)=>{
    res.render('contact_us', {
        msg: req.query.msg?req.query.msg:''
    })
})

app.post('/addContactUs', (req,res)=>{
    
    const record = req.body
    Contactuslist.create(
            record  
        , (err, data) => {
            if(err){
                const htmlMsg = encodeURIComponent('Error : ', error);
                res.redirect('/contact_us/?msg=' + htmlMsg)
            }else{
                const htmlMsg = encodeURIComponent('ContactUs Message Saved OK !');
                res.redirect('/contact_us/?msg=' + htmlMsg)
            }
            
        }) 
    
})

const server = http.createServer(app).listen(app.get('port'), () => {
    console.log("Express server listening on port " + app.get('port'));
});
const io = require('socket.io').listen(server);

let users = []

// connection event
// socket represents each client connected to our server
io.on('connection',  (socket) => {

    socket.on('connect', ()=>{
        console.log("New connection socket.id : ", socket.id)
    })

    socket.on('disconnect', ()=>{
        console.log("disconnect => nickname : ", socket.nickname)
        const updatedUsers = users.filter(user => user != socket.nickname)
        console.log("updatedUsers : ", updatedUsers)
        users = updatedUsers
        io.emit('userlist', users)
    })

    // nick event
    socket.on('nick', (nickname) => {
        console.log("nick => nickname : ", nickname)
        socket.nickname = nickname
        users.push(nickname)

        console.log("server : users : ", users)
        // emit userlist event to all connected sockets
        io.emit('userlist', users);
    });

    // chat event
    socket.on('chat', (data) => {
        console.log("chat => nickname : ", socket.nickname)
        const d = new Date()
        const ts = d.toLocaleString()
        console.log("ts : ", ts)
        const response = `${ts} : ${socket.nickname} : ${data.message}`
        console.log("rs : ", response)
        io.emit('chat', response)
    });
});