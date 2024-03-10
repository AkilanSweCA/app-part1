import request from "supertest";

import app from "../src/app";
import { Homeowner } from "../src/models/homeowner";
import { dbclose, dbconnect } from "../src/db/connection";
import { Types } from "mongoose";
import { globalConstant } from "../src/utils";
import { mockDeleteHomeownerDetails, mockdata } from "./__mocks__/inputs";
import { StatusCodes } from "../src/enum/StatusCodes";

let homeownerIds: Types.ObjectId[];
/* Connecting to the database before each test. */
beforeAll(async () => {
  await dbconnect();
  const homeownerData = await Homeowner.insertMany(mockdata);
  homeownerIds = homeownerData.map((x) => x._id);
});

/* Closing database connection after each test. */
afterAll(async () => {
  await dbclose();
});

describe("DELETE api/homeowner/_id", () => {
  it("should delete homeowner by id", async () => {
    const res = await request(app).delete(`/api/homeowner/${homeownerIds[0]}`);

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body).toMatchObject(globalConstant.home_owner.deleted);
  });
});

describe("DELETE /api/homeowners", () => {
  it("should delete all homeowners", async () => {
    const res = await request(app)
      .delete("/api/homeowners")
      .set("Content-Type", "application/xml")
      .send(mockDeleteHomeownerDetails(homeownerIds[1]));

    expect(res.statusCode).toBe(StatusCodes.OK);
    expect(res.body).toMatchObject(globalConstant.home_owner.deleted_all);
  });
});

describe("DELETE api/homeowners/_id", () => {
  it("delete homeowner record not found by id", async () => {
    await request(app).delete(`/api/homeowner/${homeownerIds[0]}`);
    const res = await request(app).delete(`/api/homeowner/${homeownerIds[0]}`);

    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body).toMatchObject(globalConstant.home_owner.not_found);
  });
});

describe("DELETE /api/homeowners", () => {
  it("All homeowner delete records not found", async () => {
    await request(app).delete(`/api/homeowner/${homeownerIds[0]}`);
    const res = await request(app)
      .delete("/api/homeowners")
      .set("Content-Type", "application/xml")
      .send(mockDeleteHomeownerDetails(homeownerIds[0]));

    expect(res.statusCode).toBe(StatusCodes.NotFound);
    expect(res.body).toMatchObject(globalConstant.home_owner.not_found);
  });
});

describe("DELETE /api/homeowners", () => {
  it("homeowner delete record ids missing", async () => {
    await request(app).delete(`/api/homeowner/${homeownerIds[0]}`);
    const res = await request(app)
      .delete("/api/homeowners")
      .set("Content-Type", "application/xml")
      .send(`<homeowner></homeowner>`);

    expect(res.statusCode).toBe(StatusCodes.BadRequest);
    expect(res.body).toMatchObject(globalConstant.home_owner.invalidReq);
  });
});
