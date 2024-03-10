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
exports.searchHomeowners = exports.getHomeownerById = exports.getHomeowners = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const StatusCodes_1 = require("../enum/StatusCodes");
const getHomeowners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(StatusCodes_1.StatusCodes.OK).json(yield (0, services_1.gethomeowner)());
});
exports.getHomeowners = getHomeowners;
const getHomeownerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, services_1.gethomeownerById)(req.params._id);
    return resp
        ? res.status(StatusCodes_1.StatusCodes.OK).json(resp)
        : res
            .status(StatusCodes_1.StatusCodes.NotFound)
            .json(utils_1.globalConstant.home_owner.not_found);
});
exports.getHomeownerById = getHomeownerById;
const searchHomeowners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchParams = req.query;
    if (Object.keys(searchParams).length === 0) {
        return res
            .status(StatusCodes_1.StatusCodes.BadRequest)
            .json(utils_1.globalConstant.home_owner.invalidReq);
    }
    const resp = yield (0, services_1.searchhomeownerByParameters)(searchParams);
    return resp.length > 0
        ? res.status(StatusCodes_1.StatusCodes.OK).json(resp)
        : res
            .status(StatusCodes_1.StatusCodes.NotFound)
            .json(utils_1.globalConstant.home_owner.not_found);
});
exports.searchHomeowners = searchHomeowners;
