const express = require('express');
const socket = require('socket.io');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

const app = express();
const server = app.listen(PORT, () => {});

app.use(express.static('public'));


const dbUsersPath = './data/db-users.json';
const getDbSessionPath = (sessionId) => `./data/db-sessions/${sessionId}.json`;

const readUsersDb = (callbackFn) => {
    fs.readFile(dbUsersPath, (err, dbUsers) => {
        if (err) console.error(err);
        else callbackFn(JSON.parse(dbUsers.toString()));
    });
};

const writeUsersDb = (newUsersDb) => {
    fs.writeFile(dbUsersPath, JSON.stringify(newUsersDb), () => {
        console.log('db written');
    });
};

const io = socket(server);

io.on('connection', (socket) => {

socket.emit('connected', {
    port: PORT,
    time: new Date().valueOf()
});

readUsersDb((dbUsers) => {
    socket.emit('users', dbUsers);
});

socket.on('setuser', (user) => {
    readUsersDb((dbUsers) => {
        dbUsers[user.id] = user;
        writeUsersDb(dbUsers);
    });
});






});