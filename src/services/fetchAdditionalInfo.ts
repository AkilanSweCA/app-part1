import { calculateAge } from "../utils/calculateAge";
import { getcoordinates } from "./getcoordinates";

export const fetchadditionalinfo = async ({ dob, address }) => {
  // calculate age
  const age = dob && !isNaN(new Date(dob).getTime()) && calculateAge(dob);
  // retrieve geocoordinates
  const coordinates = address && (await getcoordinates(address));
  return { age, coordinates };
};
