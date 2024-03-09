"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fn, next) => {
    try {
        fn();
    }
    catch (error) {
        next(error);
    }
};
