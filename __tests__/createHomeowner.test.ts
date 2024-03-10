import request from "supertest";
import { Homeowner } from "../src/models/homeowner";
import app from "../src/app";
import { dbclose, dbconnect } from "../src/db/connection";
import { globalConstant } from "../src/utils";
import {
  mockCreateHomeownerDetails,
  mockCreateMissingHomeownerDetails,
  mockCreateInvalidDobHomeownerDetails,
} from "./__mocks__/inputs";
import { StatusCodes } from "../src/enum/StatusCodes";

const fname = "Akilan" + Math.random();

/* Connecting to the database before each test. */
beforeAll(async () => {
  await dbconnect();
});

/* Closing database connection after each test. */
afterAll(async () => {
  await Homeowner.deleteOne({ fname: fname });
  await dbclose();
});

describe("Add Homeowner", () => {
  describe("POST /api/homeowners", () => {
    it("should add homeowner", async () => {
      const res = await request(app)
        .post("/api/homeowner")
        .set("Content-Type", "application/xml")
        .send(mockCreateHomeownerDetails(fname));

      expect(res.statusCode).toBe(StatusCodes.Created);
      expect(res.body).toMatchObject({ fname: fname });
    });
  });
});

describe("POST /api/homeowner", () => {
  it("should not add if already exists", async () => {
    const res = await request(app)
      .post("/api/homeowner")
      .set("Content-Type", "application/xml")
      .send(mockCreateHomeownerDetails(fname));

    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body).toMatchObject(globalConstant.home_owner.already_exists);
  });
});

describe("POST /api/homeowner", () => {
  it("should block data process if any missing details", async () => {
    const res = await request(app)
      .post("/api/homeowner")
      .set("Content-Type", "application/xml")
      .send(mockCreateMissingHomeownerDetails);

    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body).toMatchObject(globalConstant.home_owner.invalidReq);
  });
});

describe("POST /api/homeowners", () => {
  it("should block if date of birth is invalid", async () => {
    const res = await request(app)
      .post("/api/homeowner")
      .set("Content-Type", "application/xml")
      .send(mockCreateInvalidDobHomeownerDetails(fname));

    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body).toMatchObject(globalConstant.home_owner.invalidReq);
  });
});
