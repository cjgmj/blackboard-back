"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBrushPath = exports.getCanvasOrCreate = void 0;
const app_1 = require("../app");
const getCanvasOrCreate = (socket, id, color, lineWidth) => {
    let canvas = app_1.canvasList.filter((canvas) => canvas.id === id)[0];
    if (canvas === undefined) {
        canvas = { clientId: socket.id, id, color, lineWidth, brushPaths: [] };
        app_1.canvasList.push(canvas);
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
