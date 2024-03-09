import tryCatchBlock from "../helpers/tryCatchBlock";
import { IAddHomeownerRequest, IHomeowner } from "../interfaces";
import { Homeowner } from "../models/homeowner";
import { HydratedDocument } from "mongoose";

export const updatehomeowner = async (req: IAddHomeownerRequest) => {
  // Check if homeowner already exists
  const existingHomeowner = await Homeowner.findById(req._id);
  if (!existingHomeowner) {
    return;
  }

  // Save homeowner information to MongoDB
  const homeowner: HydratedDocument<IHomeowner> =
    await Homeowner.findByIdAndUpdate(req._id, req, { new: true });
  await homeowner.save();

  return homeowner;
};
