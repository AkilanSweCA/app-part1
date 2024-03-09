"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHomeownerUpdateReq = exports.validateHomeownerCreateReq = void 0;
const validateHomeownerCreateReq = ({ fname, lname, address, dob }) => {
    return !(fname && lname && address && dob && !isNaN(new Date(dob).getTime()));
};
exports.validateHomeownerCreateReq = validateHomeownerCreateReq;
const validateHomeownerUpdateReq = ({ fname, lname, address, dob }) => fname || lname || address || (dob && !isNaN(new Date(dob).getTime()));
exports.validateHomeownerUpdateReq = validateHomeownerUpdateReq;
