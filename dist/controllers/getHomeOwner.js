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
exports.searchHomeOwners = exports.getHomeOwnerById = exports.getHomeOwners = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const getHomeOwners = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(yield (0, services_1.getHomeOwnerService)());
});
exports.getHomeOwners = getHomeOwners;
const getHomeOwnerById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    if (!id) {
        return res.sendStatus(400);
    }
    const resp = yield (0, services_1.getHomeOwnerByIdService)(id);
    return resp ? res.status(200).json(resp) : res.status(404).json(utils_1.globalConstant.home_owner.not_found);
});
exports.getHomeOwnerById = getHomeOwnerById;
const searchHomeOwners = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const searchParams = req.query;
    if (!searchParams) {
        return res.sendStatus(400);
    }
    const resp = yield (0, services_1.searchHomeOwnerByParametersService)(searchParams);
    return resp.length > 0 ? res.status(200).json(resp) : res.status(404).json(utils_1.globalConstant.home_owner.not_found);
});
exports.searchHomeOwners = searchHomeOwners;
