import { CoordinatePoint } from './coordinate-point';

export type CanvasInfo = {
  clientId: string;
  id: string;
  color: string;
  lineWidth: number;
  brushPaths: BrushPath[];
};

type BrushPath = {
  initialPoint: CoordinatePoint;
  points: CoordinatePoint[];
};
