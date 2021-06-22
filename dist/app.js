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
    socket_1.emitDrawSessionBlackboard(socket, exports.canvasList);
    socket_1.listenSocket(socket, exports.canvasList);
});
server.listen(3000, () => console.log('Listening on port 3000'));
