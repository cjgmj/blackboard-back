import { Socket } from 'socket.io';

import { canvasList } from '../app';
import { CanvasInfo } from '../types/canvas-info';
import { CoordinatePoint } from '../types/coordinate-point';
import { CanvasRequest } from '../types/canvas-request';

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
