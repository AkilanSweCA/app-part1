import { Types } from "mongoose";

export const mockdata = [
  { fname: "Akilan" + Math.random(), lname: "P", dob: "1990-07-26" },
  { fname: "Alex" + Math.random(), lname: "K", dob: "1980-07-25" },
];

export const mockCreateHomeownerDetails = (fname: string) => `<homeowner>
    <fname>${fname}</fname>
    <lname>P</lname>
    <dob>1990-07-26</dob>
    <address>1106 jalna blvd</address>
    </homeowner>`;

export const mockCreateMissingHomeownerDetails = `<homeowner>
    <lname>P</lname>
    <dob>1990-07-26</dob>
    <address>1106 jalna blvd</address>
    </homeowner>`;

export const mockCreateInvalidDobHomeownerDetails = (
  fname: string
) => `<homeowner>
    <fname>${fname}</fname>
    <lname>P</lname>
    <dob>1990-07-96</dob>
    <address>1106 jalna blvd</address>
    </homeowner>`;

export const mockUpdateHomeownerDetails = (
  id: Types.ObjectId,
  fname: string,
  lname: string
) => `
<homeowner>
    <_id>${id}</_id>
    <fname>${fname}</fname>
    <lname>${lname}</lname>
    <dob>1990-07-29</dob>        
</homeowner>`;

export const mockDeleteHomeownerDetails = (homeownerId: Types.ObjectId) =>
  `<homeowner>
        <_id>${homeownerId}</_id>
    </homeowner>`;
