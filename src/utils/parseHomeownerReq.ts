export const parseHomeownerRequest = (req) => {
  const rb = req.body?.homeowner;
  const _id = rb?.id;
  const fname = rb?.fname && rb.fname[0];
  const lname = rb?.lname && rb.lname[0];
  const address = rb?.address && rb.address[0];
  const dob = rb?.dob && rb.dob[0];

  return {
    _id,
    fname,
    lname,
    address,
    dob,
  };
};
