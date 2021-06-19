import { Socket } from 'socket.io';

import { CanvasInfo } from './types/canvas-info';
import { listenSocket } from './socket/socket';

export let canvasList: CanvasInfo[] = [];

const server = require('http').createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('Client connected');

  listenSocket(socket);

  socket.on('disconnect', () => {
    canvasList = canvasList.filter((canvas) => canvas.clientId !== socket.id);
    console.log('Client disconnected');
  });
});

server.listen(3000, () => console.log('Listening on port 3000'));
