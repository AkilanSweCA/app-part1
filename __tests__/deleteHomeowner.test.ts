import mongoose from "mongoose";
import request from "supertest";

import app from "../src/app";
import { Homeowner } from "../src/models/homeowner";
import { dbclose, dbconnect } from "../src/db/connection";

require("dotenv").config();

let homeownerData = [];
/* Connecting to the database before each test. */
beforeEach(async () => {
  await dbconnect();
  homeownerData = await Homeowner.insertMany([
    { fname: "Akilan" + Math.random() },
  ]);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await dbclose();
});

describe("DELETE api/homeowner/id", () => {
  it("should delete homeowner by id", async () => {
    const res = await request(app).delete(
      `/api/homeowner/${homeownerData[0]._id}`
    );
    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE /api/homeowners", () => {
  it("should delete all homeowners", async () => {
    const res = await request(app)
      .delete("/api/homeowners")
      .set("Content-Type", "application/xml").send(`
    <homeowner>
      <ids>
        <id>${homeownerData[0]._id}</id>
      </ids>
    </homeowner>`);

    expect(res.statusCode).toBe(200);
  });
});

describe("DELETE api/homeowners/id", () => {
  it("delete record not found by id", async () => {
    await request(app).delete(`/api/homeowner/${homeownerData[0]._id}`);
    const res = await request(app).delete(
      `/api/homeowner/${homeownerData[0]._id}`
    );
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /api/homeowners", () => {
  it("delete all", async () => {
    //const updateFname = "Akilan" + Math.random();
    await request(app).delete(`/api/homeowner/${homeownerData[0]._id}`);
    const res = await request(app)
      .delete("/api/homeowners")
      .set("Content-Type", "application/xml").send(`
    <homeowner>
      <ids>
        <id>${homeownerData[0]._id}</id>
      </ids>
    </homeowner>`);

    expect(res.statusCode).toBe(404);
  });
});
