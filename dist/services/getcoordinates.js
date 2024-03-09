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
exports.getCoordinatesService = void 0;
require("dotenv").config();
// Define the geocodeService function
const getCoordinatesService = function getCoordinates(address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Extract coordinates from the response
            // Make a request to the geocoding API
            const response = yield fetch(`${process.env.GEO_API}&q=${encodeURIComponent(address)}`);
            const resp = yield response.json();
            // Return the coordinates
            return resp.length > 0 ? [resp[0].lat, resp[0].lon] : undefined;
        }
        catch (e) {
            throw e;
        }
    });
};
exports.getCoordinatesService = getCoordinatesService;
