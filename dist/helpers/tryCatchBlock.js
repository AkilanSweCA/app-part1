"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fn, next) => {
    try {
        fn().catch((e) => {
            throw e;
        });
    }
    catch (e) {
        if (next === null) {
            throw e;
        }
        next(e);
    }
};
