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
exports.fetchAdditionalInfo = void 0;
const calculateAge_1 = require("../utils/calculateAge");
const getcoordinates_1 = require("./getcoordinates");
const fetchAdditionalInfo = ({ dob, address }) => __awaiter(void 0, void 0, void 0, function* () {
    // calculate age
    const age = dob && !isNaN(new Date(dob).getTime()) && (0, calculateAge_1.calculateAge)(dob);
    // retrieve geocoordinates
    const coordinates = address && (yield (0, getcoordinates_1.getcoordinates)(address));
    return { age, coordinates };
});
exports.fetchAdditionalInfo = fetchAdditionalInfo;
