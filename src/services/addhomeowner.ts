import { Homeowner } from "../models/homeowner";
import { IAddHomeownerRequest, IHomeowner } from "../interfaces";
import { HydratedDocument } from "mongoose";
import { globalConstant } from "../utils";

export const addhomeowner = async (req: IAddHomeownerRequest) => {
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
