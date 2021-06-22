"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCanvasList = exports.getCanvasList = void 0;
let canvasList = [];
const getCanvasList = () => canvasList;
exports.getCanvasList = getCanvasList;
const setCanvasList = (canvasClientList) => {
    canvasList = canvasClientList;
};
exports.setCanvasList = setCanvasList;
