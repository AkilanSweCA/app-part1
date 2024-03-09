import { Homeowner } from "../models/homeowner";

export const deletehomeowners = async (ids: []) =>
  await Homeowner.deleteMany({ _id: { $in: ids } });

export const deletehomeownerById = async (id: string) =>
  await Homeowner.findByIdAndDelete(id);
