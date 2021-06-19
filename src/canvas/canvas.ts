import { Socket } from 'socket.io';
import { CanvasInfo } from '../models/canvas-info';
import { CoordinatePoint } from '../models/coordinate-point';
import { canvasList } from '../app';
import { CanvasRequest } from '../models/canvas-request';

const getCanvasOrCreate = (socket: Socket, canvasRequest: CanvasRequest) => {
  let canvas = canvasList.filter((canvas) => canvas.id === canvasRequest.id)[0];

  if (canvas === undefined) {
    canvas = {
      clientId: socket.id,
      id: canvasRequest.id,
      color: canvasRequest.color,
      lineWidth: canvasRequest.lineWidth,
      brushPaths: [],
    };
    canvasList.push(canvas);
  }

  return canvas;
};

const saveBrushPath = (
  canvas: CanvasInfo,
  initialPoint: Boolean,
  lastPoint: CoordinatePoint
) => {
  if (initialPoint) {
    canvas.brushPaths.push({ initialPoint: lastPoint, points: [] });
  } else {
    canvas.brushPaths[canvas.brushPaths.length - 1].points.push(lastPoint);
  }
};

export { getCanvasOrCreate, saveBrushPath };
