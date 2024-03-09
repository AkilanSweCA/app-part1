export const validateHomeownerCreateReq = ({ fname, lname, address, dob }) => {
  return !(fname && lname && address && dob && !isNaN(new Date(dob).getTime()));
};

export const validateHomeownerUpdateReq = ({ fname, lname, address, dob }) =>
  fname || lname || address || (dob && !isNaN(new Date(dob).getTime()));
