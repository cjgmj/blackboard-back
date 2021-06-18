export type CanvasRequest = {
  id: string;
  color: string;
  lineWidth: number;
  lastPoint: CoordinatePoint;
};

export type CoordinatePoint = {
  x: number;
  y: number;
};
