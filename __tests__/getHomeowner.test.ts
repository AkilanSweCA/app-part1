import request from "supertest";

import app from "../src/app";
import { Homeowner } from "../src/models/homeowner";
import { dbclose, dbconnect } from "../src/db/connection";
import { Types } from "mongoose";
import { mockdata } from "./__mocks__/inputs";
import { globalConstant } from "../src/utils";
import { StatusCodes } from "../src/enum/StatusCodes";

let homeownerDataRef: { id: Types.ObjectId; fname: string };
/* Connecting to the database before each test. */
beforeAll(async () => {
  await dbconnect();
  const homeownerData = await Homeowner.insertMany(mockdata[0]);
  homeownerDataRef = {
    id: homeownerData[0]._id,
    fname: homeownerData[0].fname,
  };
});

/* Closing database connection after each test. */
afterAll(async () => {
  await Homeowner.deleteMany({ _id: { $in: homeownerDataRef.id } });
  await dbclose();
  //app.close();
});

describe("GET api/homeowners", () => {
  it("should return all homeowners", async () => {
    const res = await request(app).get("/api/homeowners");

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET api/homeowner/id", () => {
  it("should return homeowner by id", async () => {
    const res = await request(app).get(`/api/homeowner/${homeownerDataRef.id}`);

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body.fname).toBe(homeownerDataRef.fname);
  });
});

describe("GET api/homeowner/id", () => {
  it("should not pass input", async () => {
    const res = await request(app).get(`/api/homeowner`);

    expect(res.statusCode).toBe(StatusCodes.NotFound);
  });
});

describe("GET /api/homeowners/param/search", () => {
  it("should return search matching homeowners", async () => {
    const res = await request(app).get(
      `/api/homeowners/param/search?fname=${homeownerDataRef.fname}`
    );

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body[0].fname).toBe(homeownerDataRef.fname);
  });
});

describe("GET /api/homeowners/param/search", () => {
  it("should not pass matching search parameters", async () => {
    const res = await request(app).get(
      `/api/homeowners/param/search?fname=test`
    );

    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body).toMatchObject(globalConstant.home_owner.not_found);
  });
});

describe("GET /api/homeowners/param/search", () => {
  it("should not pass search parameters", async () => {
    const res = await request(app).get(`/api/homeowners/param/search`);

    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body).toMatchObject(globalConstant.home_owner.invalidReq);
  });
});
