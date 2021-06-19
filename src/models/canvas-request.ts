import { CoordinatePoint } from './coordinate-point';

export type CanvasRequest = {
  id: string;
  color: string;
  lineWidth: number;
  lastPoint: CoordinatePoint;
};
