import { Socket } from 'socket.io';

import { emitDrawSessionBlackboard, listenSocket } from './socket/socket';
import { CanvasClient } from './types/canvas-client';

export let canvasList: CanvasClient[] = [];

const server = require('http').createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('Client connected');

  emitDrawSessionBlackboard(socket, canvasList);

  listenSocket(socket, canvasList);
});

server.listen(3000, () => console.log('Listening on port 3000'));
