"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBrushPath = exports.getCanvasOrCreate = void 0;
const data_1 = require("../data/data");
const getCanvasOrCreate = (socketId, canvasRequest) => {
    let canvas = data_1.getCanvasList().filter((canvas) => canvas.id === canvasRequest.id)[0];
    if (canvas === undefined) {
        canvas = {
            clientId: socketId,
            id: canvasRequest.id,
            color: canvasRequest.color,
            lineWidth: canvasRequest.lineWidth,
            brushPaths: [],
        };
        data_1.getCanvasList().push(canvas);
    }
    return canvas;
};
exports.getCanvasOrCreate = getCanvasOrCreate;
const saveBrushPath = (canvas, initialPoint, lastPoint) => {
    if (initialPoint) {
        canvas.brushPaths.push({ initialPoint: lastPoint, points: [] });
    }
    else {
        canvas.brushPaths[canvas.brushPaths.length - 1].points.push(lastPoint);
    }
};
exports.saveBrushPath = saveBrushPath;
