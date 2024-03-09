"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHomeownerRequest = void 0;
const parseHomeownerRequest = (req) => {
    var _a;
    const rb = (_a = req.body) === null || _a === void 0 ? void 0 : _a.homeowner;
    const _id = rb === null || rb === void 0 ? void 0 : rb.id;
    const fname = (rb === null || rb === void 0 ? void 0 : rb.fname) && rb.fname[0];
    const lname = (rb === null || rb === void 0 ? void 0 : rb.lname) && rb.lname[0];
    const address = (rb === null || rb === void 0 ? void 0 : rb.address) && rb.address[0];
    const dob = (rb === null || rb === void 0 ? void 0 : rb.dob) && rb.dob[0];
    return {
        _id,
        fname,
        lname,
        address,
        dob,
    };
};
exports.parseHomeownerRequest = parseHomeownerRequest;
