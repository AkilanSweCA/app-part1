import { Homeowner } from "../models/homeowner";
import { ICreateHomeownerRequest, IHomeowner } from "../interfaces";
import { HydratedDocument } from "mongoose";

export const createhomeowner = async (req: ICreateHomeownerRequest) => {
  // Check if homeowner already exists
  const filter = { fname: req.fname, lname: req.lname, dob: req.dob };
  const existingHomeowner = await Homeowner.findOne(filter);
  if (existingHomeowner) {
    return;
  }

  // Save homeowner information to MongoDB
  const homeowner: HydratedDocument<IHomeowner> = new Homeowner(req);
  await homeowner.save();

  return homeowner;
};
