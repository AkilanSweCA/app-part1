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
exports.addHomeOwner = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const addHomeOwner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Parse XML document
    const rb = (_a = req.body) === null || _a === void 0 ? void 0 : _a.homeowner;
    const fname = (rb === null || rb === void 0 ? void 0 : rb.fname) && rb.fname[0];
    const lname = (rb === null || rb === void 0 ? void 0 : rb.lname) && rb.lname[0];
    const address = (rb === null || rb === void 0 ? void 0 : rb.address) && rb.address[0];
    const dob = (rb === null || rb === void 0 ? void 0 : rb.dob) && rb.dob[0];
    if (inputDataCheck(fname, lname, address, dob)) {
        return res.sendStatus(400);
    }
    // calculate age
    const age = (0, utils_1.calculateAge)(dob);
    // retrieve geocoordinates
    const coordinates = yield (0, services_1.getCoordinatesService)(address);
    const reqData = { fname, lname, address, dob, age, coordinates };
    const resp = yield (0, services_1.addHomeOwnerService)(reqData);
    return resp !== utils_1.globalConstant.home_owner.already_exists ? res.status(201).json(resp) : res.status(400).json(resp);
});
exports.addHomeOwner = addHomeOwner;
const inputDataCheck = (fname, lname, address, dob) => !(fname && lname && address && dob && !isNaN(new Date(dob).getTime()));
