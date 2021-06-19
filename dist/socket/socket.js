"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenSocket = void 0;
const canvas_1 = require("../canvas/canvas");
const listenSocket = (socket) => {
    drawMyBlackBoard(socket);
};
exports.listenSocket = listenSocket;
const drawMyBlackBoard = (socket) => {
    socket.on('drawMyBlackBoard', (canvasRequest, initialPoint) => {
        const canvas = canvas_1.getCanvasOrCreate(socket, canvasRequest);
        canvas_1.saveBrushPath(canvas, initialPoint, canvasRequest.lastPoint);
        emitDrawOnClient(socket, canvasRequest, initialPoint);
    });
};
const emitDrawOnClient = (socket, canvasRequest, initialPoint) => {
    socket.broadcast.emit('drawOnClient', canvasRequest, initialPoint);
};
