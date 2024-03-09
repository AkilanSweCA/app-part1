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
exports.updateHomeowner = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const StatusCodes_1 = require("../enum/StatusCodes");
const updateHomeowner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Parse XML document
    const obj = (0, utils_1.parseHomeownerRequest)(req);
    if (!obj._id || !(0, utils_1.validateHomeownerUpdateReq)(obj)) {
        return res.sendStatus(StatusCodes_1.StatusCodes.BadRequest);
    }
    const additionalInfo = yield (0, services_1.fetchAdditionalInfo)(obj);
    const resp = yield (0, services_1.updatehomeowner)(Object.assign(Object.assign({}, obj), additionalInfo));
    return resp == null
        ? res.status(StatusCodes_1.StatusCodes.OK).json(resp)
        : res
            .status(StatusCodes_1.StatusCodes.NotFound)
            .json(utils_1.globalConstant.home_owner.not_found);
});
exports.updateHomeowner = updateHomeowner;
