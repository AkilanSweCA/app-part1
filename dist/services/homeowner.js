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
exports.searchHomeOwnerByParametersService = exports.getHomeOwnerByIdService = exports.getHomeOwnerService = exports.addHomeOwnerService = void 0;
const homeowner_1 = require("../models/homeowner");
const utils_1 = require("../utils");
const addHomeOwnerService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if homeowner already exists
    const filter = { fname: req.fname, lname: req.lname, dob: req.dob };
    const existingHomeowner = yield homeowner_1.Homeowner.findOne(filter);
    if (existingHomeowner) {
        return utils_1.globalConstant.home_owner.already_exists;
    }
    // Save homeowner information to MongoDB
    const homeowner = new homeowner_1.Homeowner(req);
    yield homeowner.save();
    return homeowner;
});
exports.addHomeOwnerService = addHomeOwnerService;
const getHomeOwnerService = () => __awaiter(void 0, void 0, void 0, function* () { return yield homeowner_1.Homeowner.find(); });
exports.getHomeOwnerService = getHomeOwnerService;
const getHomeOwnerByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield homeowner_1.Homeowner.findById(id); });
exports.getHomeOwnerByIdService = getHomeOwnerByIdService;
const searchHomeOwnerByParametersService = (searchParams) => __awaiter(void 0, void 0, void 0, function* () { return yield homeowner_1.Homeowner.find(searchParams); });
exports.searchHomeOwnerByParametersService = searchHomeOwnerByParametersService;
