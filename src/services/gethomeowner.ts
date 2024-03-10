import { Homeowner } from "../models/homeowner";
import { ISearchHomeowner } from "../interfaces";

export const gethomeowner = async () => await Homeowner.find();

export const gethomeownerById = async (id: string) =>
  await Homeowner.findById(id);

export const searchhomeownerByParameters = async (
  searchParams: Partial<ISearchHomeowner>
) => await Homeowner.find(searchParams);
