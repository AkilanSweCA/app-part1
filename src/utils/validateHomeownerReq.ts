import { ICreateHomeowner } from "../interfaces";

export const validateHomeownerCreateReq = ({
  fname,
  lname,
  address,
  dob,
}: ICreateHomeowner) => {
  return !(fname && lname && address && dob && !isNaN(new Date(dob).getTime()));
};

export const validateHomeownerUpdateReq = ({
  _id,
  fname,
  lname,
  address,
  dob,
}: ICreateHomeowner) =>
  _id &&
  (fname || lname || address || (dob && !isNaN(new Date(dob).getTime())));
