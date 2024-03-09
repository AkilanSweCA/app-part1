import { Schema, model } from "mongoose";
import { IHomeowner } from "../interfaces";

// Homeowner model
const HomeownerSchema = new Schema<IHomeowner>({
  fname: String,
  lname: String,
  dob: Date,
  age: Number,
  address: String,
  coordinates: { type: [Number], index: "2dsphere" },
});

export const Homeowner = model<IHomeowner>("Homeowner", HomeownerSchema);
