"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenSocket = void 0;
const canvas_1 = require("../canvas/canvas");
const listenSocket = (socket) => {
    drawMyBlackBoard(socket);
};
exports.listenSocket = listenSocket;
const drawMyBlackBoard = (socket) => {
    socket.on('drawMyBlackBoard', ({ id, color, lineWidth, lastPoint }, initialPoint) => {
        const canvas = canvas_1.getCanvasOrCreate(socket, id, color, lineWidth);
        canvas_1.saveBrushPath(canvas, initialPoint, lastPoint);
        emitDrawOnClient(socket, { id, color, lineWidth, lastPoint }, initialPoint);
        console.log(canvas);
    });
};
const emitDrawOnClient = (socket, canvasRequest, initialPoint) => {
    socket.broadcast.emit('drawOnClient', canvasRequest, initialPoint);
};
