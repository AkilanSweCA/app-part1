import request from "supertest";

import app from "../src/app";
import { Homeowner } from "../src/models/homeowner";
import { dbclose, dbconnect } from "../src/db/connection";
import { Types } from "mongoose";
import { mockUpdateHomeownerDetails, mockdata } from "./__mocks__/inputs";
import { StatusCodes } from "../src/enum/StatusCodes";
import { globalConstant } from "../src/utils";

let homeownerId: Types.ObjectId;
/* Connecting to the database before each test. */
beforeAll(async () => {
  await dbconnect();
  const homeownerData = await Homeowner.insertMany(mockdata[0]);
  homeownerId = homeownerData[0]._id;
});

/* Closing database connection after each test. */
afterAll(async () => {
  await Homeowner.deleteMany({ _id: { $in: homeownerId } });
  await dbclose();
});

describe("PUT /api/homeowner", () => {
  it("should update homeowner first name", async () => {
    const [fname, lname] = ["Akilan" + Math.random(), "P"];
    const res = await request(app)
      .put("/api/homeowner")
      .set("Content-Type", "application/xml")
      .send(mockUpdateHomeownerDetails(homeownerId, fname, lname));

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      fname: fname,
      lname: lname,
    });
  });
});

describe("PUT /api/homeowner", () => {
  it("update record not found", async () => {
    await request(app).delete(`/api/homeowner/${homeownerId}`);
    const [fname, lname] = ["Akilan" + Math.random(), "P"];
    const res = await request(app)
      .put("/api/homeowner")
      .set("Content-Type", "application/xml")
      .send(mockUpdateHomeownerDetails(homeownerId, fname, lname));

    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body).toMatchObject(globalConstant.home_owner.not_found);
  });
});

describe("PUT /api/homeowner", () => {
  it("should not update without any values", async () => {
    await request(app).delete(`/api/homeowner/${homeownerId}`);
    const [fname, lname] = ["Akilan" + Math.random(), "P"];
    const res = await request(app)
      .put("/api/homeowner")
      .set("Content-Type", "application/xml")
      .send(`<homeowner></homeowner>`);

    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body).toMatchObject(globalConstant.home_owner.invalidReq);
  });
});
