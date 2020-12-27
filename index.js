const express = require('express');
const socket = require('socket.io');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

const app = express();
const server = app.listen(PORT, () => {});

app.use(express.static('public'));

const io = socket(server);

io.on('connection', (socket) => {
    socket.emit('connected', {
        port: PORT,
        time: new Date().valueOf()
    });
});