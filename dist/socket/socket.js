"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectAndListenSocket = void 0;
const canvas_1 = require("../canvas/canvas");
const data_1 = require("../data/data");
const connectAndListenSocket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: 'http://localhost:8080',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log('Client connected');
        emitDrawSessionBlackboard(socket, data_1.getCanvasList());
        drawMyBlackboard(socket);
        onDisconnect(socket);
    });
};
exports.connectAndListenSocket = connectAndListenSocket;
const drawMyBlackboard = (socket) => {
    socket.on('drawMyBlackboard', (canvasInfo, initialPoint) => {
        const canvas = canvas_1.getCanvasOrCreate(socket.id, canvasInfo);
        canvas_1.saveBrushPath(canvas, initialPoint, canvasInfo.lastPoint);
        emitDrawOnClient(socket, canvasInfo, initialPoint);
    });
};
const onDisconnect = (socket) => {
    socket.on('disconnect', () => {
        data_1.getCanvasList().forEach((cl) => console.log(cl.id));
        data_1.setCanvasList(data_1.getCanvasList().filter((canvas) => canvas.clientId !== socket.id));
        console.log('Client disconnected');
    });
};
const emitDrawSessionBlackboard = (socket, canvasList) => {
    const listCanvasClient = [...canvasList].map((canvasClient) => {
        canvasClient.clientId = '';
        return canvasClient;
    });
    socket.emit('drawSessionBlackboard', listCanvasClient);
};
const emitDrawOnClient = (socket, canvasInfo, initialPoint) => {
    socket.broadcast.emit('drawOnClient', canvasInfo, initialPoint);
};
