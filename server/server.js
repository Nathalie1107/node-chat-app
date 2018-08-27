const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', (socket) => {
        console.log('Disconnect with client');
    })

    socket.on('createMessage', (message) => {
        console.log('createMessage', message, typeof message); 
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    // socket.emit('newMessage', {
    //     from: 'nathalie.nhu.y@gmail.com',
    //     text: "Hey I miss you",
    //     createAt: 123
    // });
} );



server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})