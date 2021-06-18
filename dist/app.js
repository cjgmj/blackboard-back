"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const canvasList = [];
const app = express_1.default();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('drawMyBlackBoard', ({ id, color, lastPoint }, initialPoint) => {
        // socket.emit('drawUserCanva');
        const canvas = getCanvasOrCreate(id, color);
        saveBrushPath(canvas, initialPoint, lastPoint);
        console.log(canvas);
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
server.listen(3000, () => console.log('Listening on port 3000'));
const getCanvasOrCreate = (id, color) => {
    const canvas = canvasList.filter((canvas) => canvas.id === id)[0] || { id, color, brushPaths: [] };
    canvasList.push(canvas);
    return canvas;
};
const saveBrushPath = (canvas, initialPoint, lastPoint) => {
    if (initialPoint) {
        canvas.brushPaths.push({
            initialPoint: lastPoint,
            points: [],
        });
    }
    else {
        canvas.brushPaths[canvas.brushPaths.length - 1].points.push(lastPoint);
    }
};
