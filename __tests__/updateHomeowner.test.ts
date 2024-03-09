import mongoose from "mongoose";
import request from "supertest";

import app from "../src/app";
import { Homeowner } from "../src/models/homeowner";
import { dbclose, dbconnect } from "../src/db/connection";

require("dotenv").config();

let homeownerData = [];
/* Connecting to the database before each test. */
beforeAll(async () => {
  await dbconnect();
  //const homeowner = new Homeowner(homeownerData);
  homeownerData = await Homeowner.insertMany([
    { fname: "Akilan" + Math.random() },
  ]);
});

/* Closing database connection after each test. */
afterAll(async () => {
  await Homeowner.deleteMany({ _id: { $in: homeownerData.map((x) => x._id) } });
  await dbclose();
});

describe("PUT /api/homeowner", () => {
  it("should update homeowner first name", async () => {
    const updateFname = "Akilan" + Math.random();
    const res = await request(app)
      .put("/api/homeowner")
      .set("Content-Type", "application/xml").send(`
    <homeowner>
        <id>${homeownerData[0]._id}</id>
        <fname>${updateFname}</fname>
    </homeowner>`);
    expect(res.statusCode).toBe(200);
    expect(res.body.fname).toBe(updateFname);
  });
});

describe("PUT /api/homeowner", () => {
  it("update record not found", async () => {
    const updateFname = "Akilan" + Math.random();
    await request(app).delete(`/api/homeowner/${homeownerData[0]._id}`);
    const res = await request(app)
      .put("/api/homeowner")
      .set("Content-Type", "application/xml").send(`
    <homeowner>
        <id>${homeownerData[0]._id}</id>
        <fname>${updateFname}</fname>
        <lname>P</lname>
        <dob>1990-07-26</dob>
        <address>1106 jalna blvd</address>
    </homeowner>`);

    expect(res.statusCode).toBe(404);
  });
});
