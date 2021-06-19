import { Socket } from 'socket.io';
import { getCanvasOrCreate, saveBrushPath } from '../canvas/canvas';
import { CanvasRequest } from '../models/canvas-request';

const listenSocket = (socket: Socket): void => {
  drawMyBlackBoard(socket);
};

const drawMyBlackBoard = (socket: Socket): void => {
  socket.on(
    'drawMyBlackBoard',
    (
      { id, color, lineWidth, lastPoint }: CanvasRequest,
      initialPoint: boolean
    ) => {
      const canvas = getCanvasOrCreate(socket, id, color, lineWidth);
      saveBrushPath(canvas, initialPoint, lastPoint);
      emitDrawOnClient(
        socket,
        { id, color, lineWidth, lastPoint } as CanvasRequest,
        initialPoint
      );
      console.log(canvas);
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
