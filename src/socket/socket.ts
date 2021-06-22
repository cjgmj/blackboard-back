import { Server } from 'http';
import { Socket } from 'socket.io';

import { getCanvasOrCreate, saveBrushPath } from '../canvas/canvas';
import { getCanvasList, setCanvasList } from '../data/data';

import { CanvasClient } from '../types/canvas-client';
import { CanvasInfo } from '../types/canvas-info';

const connectAndListenSocket = (server: Server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('Client connected');

    emitDrawSessionBlackboard(socket, getCanvasList());

    drawMyBlackboard(socket);
    onDisconnect(socket);
  });
};

const drawMyBlackboard = (socket: Socket): void => {
  socket.on(
    'drawMyBlackboard',
    (canvasInfo: CanvasInfo, initialPoint: boolean) => {
      const canvas = getCanvasOrCreate(socket.id, canvasInfo);
      saveBrushPath(canvas, initialPoint, canvasInfo.lastPoint);
      emitDrawOnClient(socket, canvasInfo, initialPoint);
    }
  );
};

const onDisconnect = (socket: Socket) => {
  socket.on('disconnect', () => {
    // FIXME no se elimina bien el registro
    // Pasa cuando pintas en una pizarra y en otra y
    // recargas las dos (primero la última en la que has
    // pintado)
    setCanvasList(
      getCanvasList().filter(
        (canvas: CanvasClient) => canvas.clientId !== socket.id
      )
    );
    console.log('Client disconnected');
  });
};

const emitDrawSessionBlackboard = (
  socket: Socket,
  canvasList: CanvasClient[]
): void => {
  const listCanvasClient = [...canvasList].map((canvasClient) => {
    canvasClient.clientId = '';

    return canvasClient;
  });

  socket.emit('drawSessionBlackboard', listCanvasClient);
};

const emitDrawOnClient = (
  socket: Socket,
  canvasInfo: CanvasInfo,
  initialPoint: boolean
): void => {
  socket.broadcast.emit('drawOnClient', canvasInfo, initialPoint);
};

export { connectAndListenSocket };
