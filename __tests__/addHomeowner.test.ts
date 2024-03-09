import mongoose from "mongoose";
import request from "supertest";
import { Homeowner } from "../src/models/homeowner";
import app from "../src/app";
import { dbclose, dbconnect } from "../src/db/connection";

require("dotenv").config();

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
        .set("Content-Type", "application/xml").send(`
    <homeowner>
        <fname>${fname}</fname>
        <lname>P</lname>
        <dob>1990-07-26</dob>
        <address>1106 jalna blvd</address>
    </homeowner>`);
      expect(res.statusCode).toBe(201);
      expect(res.body.fname).toBe(fname);
      expect(res.body).toMatchObject({
        fname: fname,
      });
    });
  });

  describe("POST /api/homeowner", () => {
    it("should not add if already exists", async () => {
      const res = await request(app)
        .post("/api/homeowner")
        .set("Content-Type", "application/xml").send(`
        <homeowner>
            <fname>${fname}</fname>
            <lname>P</lname>
            <dob>1990-07-26</dob>
            <address>1106 jalna blvd</address>
        </homeowner>`);
      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /api/homeowner", () => {
    it("should block data process if any missing details", async () => {
      const res = await request(app)
        .post("/api/homeowner")
        .set("Content-Type", "application/xml").send(`
    <homeowner>
        <fname>${fname}</fname>
        <lname>P</lname>
    </homeowner>`);
      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /api/homeowners", () => {
    it("should block if date of birth is invalid", async () => {
      const res = await request(app)
        .post("/api/homeowner")
        .set("Content-Type", "application/xml").send(`
        <homeowner>
            <fname>${fname}</fname>
            <lname>P</lname>
            <dob>1990-07-50</dob>
            <address>1106 jalna blvd</address>
        </homeowner>`);
      expect(res.statusCode).toBe(400);
    });
  });
});
