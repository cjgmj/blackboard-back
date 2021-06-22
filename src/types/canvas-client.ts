import { CoordinatePoint } from './coordinate-point';

export type CanvasClient = {
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
