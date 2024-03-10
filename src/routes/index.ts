import * as express from "express";
import {
  createHomeowner,
  getHomeownerById,
  getHomeowners,
  searchHomeowners,
  updateHomeowner,
  deleteHomeowners,
  deleteHomeownerById,
} from "../controllers";
import { asyncWrapper } from "../helpers/asyncWrapper";
const router = express.Router();

// POST /homeowners
router.post("/api/homeowner", asyncWrapper(createHomeowner));

// GET /homeowners
router.get("/api/homeowners", asyncWrapper(getHomeowners));

// GET /homeowners/:id
router.get("/api/homeowner/:_id", asyncWrapper(getHomeownerById));

// GET /homeowners/param/search?fname=value&lname=value
router.get("/api/homeowners/param/search", asyncWrapper(searchHomeowners));

// PUT /homeowners
router.put("/api/homeowner", asyncWrapper(updateHomeowner));

// DELETE /homeowners
router.delete("/api/homeowners", asyncWrapper(deleteHomeowners));

// DELETE /homeowners/:id
router.delete("/api/homeowner/:_id", asyncWrapper(deleteHomeownerById));

export default router;
