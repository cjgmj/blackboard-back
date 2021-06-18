import { CoordinatePoint } from './canvas-request';

export type CanvasInfo = {
  id: string;
  color: string;
  lineWidth: number;
  brushPaths: BrushPath[];
};

export type BrushPath = {
  initialPoint: CoordinatePoint;
  points: CoordinatePoint[];
};
