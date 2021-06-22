"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket/socket");
const server = require('http').createServer();
socket_1.connectAndListenSocket(server);
server.listen(3000, () => console.log('Listening on port 3000'));
