const express = require('express');
const path = require('path');
const http = require('http')

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, 'views')));

const server = http.createServer(app).listen(app.get('port'), () => {
    console.log("Server listening on port " + app.get('port'));
});
const io = require('socket.io')(server);

let users = []

io.on('connection',  (socket) => {

    socket.on('connect', ()=>{
        console.log("New connection socket.id : ", socket.id)
    })

    socket.on('disconnect', ()=>{
        const updatedUsers = users.filter(user => user != socket.nickname)
        users = updatedUsers
        io.emit('userlist', users)
    })

    // nick event
    socket.on('nick', (nickname) => {
        socket.nickname = nickname
        users.push(nickname)
        io.emit('userlist', users);
    });

    // chat event
    socket.on('chat', (data) => {
        const d = new Date()
        const ts = d.toLocaleString()
        const response = `${ts} : ${socket.nickname} : ${data.message}`
        io.emit('chat', response)
    });
});