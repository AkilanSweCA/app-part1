"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchhomeownerByParameters = exports.gethomeownerById = exports.gethomeowner = void 0;
const homeowner_1 = require("../models/homeowner");
const gethomeowner = () => __awaiter(void 0, void 0, void 0, function* () { return yield homeowner_1.Homeowner.find(); });
exports.gethomeowner = gethomeowner;
const gethomeownerById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield homeowner_1.Homeowner.findById(id); });
exports.gethomeownerById = gethomeownerById;
const searchhomeownerByParameters = (searchParams) => __awaiter(void 0, void 0, void 0, function* () { return yield homeowner_1.Homeowner.find(searchParams); });
exports.searchhomeownerByParameters = searchhomeownerByParameters;
