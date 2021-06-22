import { getCanvasList } from '../data/data';

import { CanvasClient } from '../types/canvas-client';
import { CanvasInfo } from '../types/canvas-info';
import { CoordinatePoint } from '../types/coordinate-point';

const getCanvasOrCreate = (socketId: string, canvasRequest: CanvasInfo) => {
  let canvas = getCanvasList().filter(
    (canvas: CanvasClient) => canvas.id === canvasRequest.id
  )[0];

  if (canvas === undefined) {
    canvas = {
      clientId: socketId,
      id: canvasRequest.id,
      color: canvasRequest.color,
      lineWidth: canvasRequest.lineWidth,
      brushPaths: [],
    };
    getCanvasList().push(canvas);
  }

  return canvas;
};

const saveBrushPath = (
  canvas: CanvasClient,
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
