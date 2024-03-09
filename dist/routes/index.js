"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const controllers_1 = require("../controllers");
const asyncWrapper_1 = require("../helpers/asyncWrapper");
const router = express.Router();
// POST /homeowners
router.post("/api/homeowner", (0, asyncWrapper_1.asyncWrapper)(controllers_1.createHomeowner));
// GET /homeowners
router.get("/api/homeowners", (0, asyncWrapper_1.asyncWrapper)(controllers_1.getHomeowners));
// GET /homeowners/:id
router.get("/api/homeowner/:id", (0, asyncWrapper_1.asyncWrapper)(controllers_1.getHomeownerById));
// GET /homeowners/param/search?fname=value&lname=value
router.get("/api/homeowners/param/search", (0, asyncWrapper_1.asyncWrapper)(controllers_1.searchHomeowners));
// PUT /homeowners
router.put("/api/homeowner", (0, asyncWrapper_1.asyncWrapper)(controllers_1.updateHomeowner));
// DELETE /homeowners
router.delete("/api/homeowners", (0, asyncWrapper_1.asyncWrapper)(controllers_1.deleteHomeowners));
// DELETE /homeowners/:id
router.delete("/api/homeowner/:id", (0, asyncWrapper_1.asyncWrapper)(controllers_1.deleteHomeownerById));
exports.default = router;
