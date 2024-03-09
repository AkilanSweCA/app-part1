import { Homeowner } from "../models/homeowner";

export const gethomeowner = async () => await Homeowner.find();

export const gethomeownerById = async (id) => await Homeowner.findById(id);

export const searchhomeownerByParameters = async (searchParams) =>
  await Homeowner.find(searchParams);
