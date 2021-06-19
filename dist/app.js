"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canvasList = void 0;
const socket_1 = require("./socket/socket");
exports.canvasList = [];
const server = require('http').createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log('Client connected');
    socket_1.listenSocket(socket);
    socket.on('disconnect', () => {
        exports.canvasList = exports.canvasList.filter((canvas) => canvas.clientId !== socket.id);
        console.log('Client disconnected');
    });
});
server.listen(3000, () => console.log('Listening on port 3000'));
