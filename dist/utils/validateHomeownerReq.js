"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHomeownerUpdateReq = exports.validateHomeownerCreateReq = void 0;
const validateHomeownerCreateReq = ({ fname, lname, address, dob, }) => {
    return !(fname && lname && address && dob && !isNaN(new Date(dob).getTime()));
};
exports.validateHomeownerCreateReq = validateHomeownerCreateReq;
const validateHomeownerUpdateReq = ({ _id, fname, lname, address, dob, }) => _id &&
    (fname || lname || address || (dob && !isNaN(new Date(dob).getTime())));
exports.validateHomeownerUpdateReq = validateHomeownerUpdateReq;
