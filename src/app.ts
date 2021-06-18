import express from 'express';
import { Socket } from 'socket.io';

import { CanvasRequest, CoordinatePoint } from './models/canvas-request';
import { CanvasInfo, BrushPath } from './models/canvas-info';

const canvasList: CanvasInfo[] = [];

const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  console.log('Client connected');

  socket.on(
    'drawMyBlackBoard',
    ({ id, color, lastPoint }: CanvasRequest, initialPoint: Boolean) => {
      // socket.emit('drawUserCanva');
      const canvas = getCanvasOrCreate(id, color);
      saveBrushPath(canvas, initialPoint, lastPoint);

      console.log(canvas);
    }
  );

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => console.log('Listening on port 3000'));

const getCanvasOrCreate = (id: string, color: string) => {
  const canvas: CanvasInfo = canvasList.filter(
    (canvas) => canvas.id === id
  )[0] || { id, color, brushPaths: [] };

  canvasList.push(canvas);

  return canvas;
};

const saveBrushPath = (
  canvas: CanvasInfo,
  initialPoint: Boolean,
  lastPoint: CoordinatePoint
) => {
  if (initialPoint) {
    canvas.brushPaths.push({
      initialPoint: lastPoint,
      points: [],
    } as BrushPath);
  } else {
    canvas.brushPaths[canvas.brushPaths.length - 1].points.push(lastPoint);
  }
};
