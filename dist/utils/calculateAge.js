"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAge = void 0;
// Function to calculate age
const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
exports.calculateAge = calculateAge;
