const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(3000);

app.use(express.static('public'));

console.log('My WebSocket is running...');

const io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log(`New Connection: ${socket.id}`);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
    }
}

