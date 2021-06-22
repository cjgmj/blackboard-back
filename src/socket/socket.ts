import { emit } from 'process';
import { Socket } from 'socket.io';
import { getCanvasOrCreate, saveBrushPath } from '../canvas/canvas';
import { CanvasClient } from '../types/canvas-client';
import { CanvasInfo } from '../types/canvas-info';

const listenSocket = (socket: Socket, canvasList: CanvasClient[]): void => {
  drawMyBlackboard(socket);
  disconnect(socket, canvasList);
};

const drawMyBlackboard = (socket: Socket): void => {
  socket.on(
    'drawMyBlackboard',
    (canvasInfo: CanvasInfo, initialPoint: boolean) => {
      const canvas = getCanvasOrCreate(socket, canvasInfo);
      saveBrushPath(canvas, initialPoint, canvasInfo.lastPoint);
      emitDrawOnClient(socket, canvasInfo, initialPoint);
    }
  );
};

const disconnect = (socket: Socket, canvasList: CanvasClient[]) => {
  socket.on('disconnect', () => {
    // FIXME no elimina bien de la lista
    canvasList = canvasList.filter((canvas) => canvas.clientId !== socket.id);
    console.log('Client disconnected');
  });
};

const emitDrawSessionBlackboard = (
  socket: Socket,
  canvasList: CanvasClient[]
): void => {
  const listCanvasClient = [...canvasList];

  listCanvasClient.forEach((canvasClient) => (canvasClient.clientId = ''));

  socket.emit('drawSessionBlackboard', listCanvasClient);
};

const emitDrawOnClient = (
  socket: Socket,
  canvasInfo: CanvasInfo,
  initialPoint: boolean
): void => {
  socket.broadcast.emit('drawOnClient', canvasInfo, initialPoint);
};

export { listenSocket, emitDrawSessionBlackboard };
