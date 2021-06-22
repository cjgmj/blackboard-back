import { CoordinatePoint } from './coordinate-point';

export type CanvasInfo = {
  id: string;
  color: string;
  lineWidth: number;
  lastPoint: CoordinatePoint;
};
