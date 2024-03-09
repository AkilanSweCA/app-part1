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
exports.updatehomeowner = void 0;
const homeowner_1 = require("../models/homeowner");
const updatehomeowner = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if homeowner already exists
    const existingHomeowner = yield homeowner_1.Homeowner.findById(req._id);
    if (!existingHomeowner) {
        return;
    }
    // Save homeowner information to MongoDB
    const homeowner = yield homeowner_1.Homeowner.findByIdAndUpdate(req._id, req, { new: true });
    yield homeowner.save();
    return homeowner;
});
exports.updatehomeowner = updatehomeowner;
