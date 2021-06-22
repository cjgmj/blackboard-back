"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitDrawSessionBlackboard = exports.listenSocket = void 0;
const canvas_1 = require("../canvas/canvas");
const listenSocket = (socket, canvasList) => {
    drawMyBlackboard(socket);
    disconnect(socket, canvasList);
};
exports.listenSocket = listenSocket;
const drawMyBlackboard = (socket) => {
    socket.on('drawMyBlackboard', (canvasInfo, initialPoint) => {
        const canvas = canvas_1.getCanvasOrCreate(socket, canvasInfo);
        canvas_1.saveBrushPath(canvas, initialPoint, canvasInfo.lastPoint);
        emitDrawOnClient(socket, canvasInfo, initialPoint);
    });
};
const disconnect = (socket, canvasList) => {
    socket.on('disconnect', () => {
        // FIXME no elimina bien de la lista
        canvasList = canvasList.filter((canvas) => canvas.clientId !== socket.id);
        console.log('Client disconnected');
    });
};
const emitDrawSessionBlackboard = (socket, canvasList) => {
    const listCanvasClient = [...canvasList];
    listCanvasClient.forEach((canvasClient) => (canvasClient.clientId = ''));
    socket.emit('drawSessionBlackboard', listCanvasClient);
};
exports.emitDrawSessionBlackboard = emitDrawSessionBlackboard;
const emitDrawOnClient = (socket, canvasInfo, initialPoint) => {
    socket.broadcast.emit('drawOnClient', canvasInfo, initialPoint);
};
