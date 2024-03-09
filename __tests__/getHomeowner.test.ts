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
  homeownerData = await Homeowner.insertMany([
    { fname: "Akilan" + Math.random() },
    { fname: "Akilan" + Math.random() },
  ]);
});

/* Closing database connection after each test. */
afterAll(async () => {
  await Homeowner.deleteMany({ _id: { $in: homeownerData.map((x) => x._id) } });
  await dbclose();
  //app.close();
});

describe("GET api/homeowners", () => {
  it("should return all homeowners", async () => {
    const res = await request(app).get("/api/homeowners");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET api/homeowner/id", () => {
  it("should return homeowner by id", async () => {
    const res = await request(app).get(
      `/api/homeowner/${homeownerData[0]._id}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.fname).toBe(homeownerData[0].fname);
  });
});

describe("GET api/homeowner/id", () => {
  it("should not pass input", async () => {
    const res = await request(app).get(`/api/homeowner`);
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /api/homeowners/param/search", () => {
  it("should return search matching homeowners", async () => {
    const res = await request(app).get(
      `/api/homeowners/param/search?fname=${homeownerData[0].fname}`
    );
    expect(res.statusCode).toBe(200);
    expect(res.body[0].fname).toBe(homeownerData[0].fname);
  });
});

describe("GET /api/homeowners/param/search", () => {
  it("should not pass matching search parameters", async () => {
    const res = await request(app).get(
      `/api/homeowners/param/search?fname=test`
    );
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /api/homeowners/param/search", () => {
  it("should not pass search parameters", async () => {
    const res = await request(app).get(`/api/homeowners/param/search`);
    expect(res.statusCode).toBe(400);
  });
});
