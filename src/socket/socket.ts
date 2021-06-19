import { Socket } from 'socket.io';
import { getCanvasOrCreate, saveBrushPath } from '../canvas/canvas';
import { CanvasRequest } from '../models/canvas-request';

const listenSocket = (socket: Socket): void => {
  drawMyBlackBoard(socket);
};

const drawMyBlackBoard = (socket: Socket): void => {
  socket.on(
    'drawMyBlackBoard',
    (canvasRequest: CanvasRequest, initialPoint: boolean) => {
      const canvas = getCanvasOrCreate(socket, canvasRequest);
      saveBrushPath(canvas, initialPoint, canvasRequest.lastPoint);
      emitDrawOnClient(socket, canvasRequest, initialPoint);
    }
  );
};

const emitDrawOnClient = (
  socket: Socket,
  canvasRequest: CanvasRequest,
  initialPoint: boolean
): void => {
  socket.broadcast.emit('drawOnClient', canvasRequest, initialPoint);
};

export { listenSocket };
