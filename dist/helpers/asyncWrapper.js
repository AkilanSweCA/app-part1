"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
const asyncWrapper = (cb) => {
    return (req, res, next) => cb(req, res, next).catch(next);
};
exports.asyncWrapper = asyncWrapper;
