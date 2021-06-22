import { CanvasClient } from '../types/canvas-client';

let canvasList: CanvasClient[] = [];

const getCanvasList = (): CanvasClient[] => canvasList;

const setCanvasList = (canvasClientList: CanvasClient[]): void => {
  canvasList = canvasClientList;
};

export { getCanvasList, setCanvasList };
