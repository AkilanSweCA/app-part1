import * as express from "express";
import {
  addHomeowner,
  getHomeownerById,
  getHomeowners,
  searchHomeowners,
  updateHomeowner,
  deleteHomeowners,
  deleteHomeownerById,
} from "../controllers";

const router = express.Router();

const asyncWrapper = (cb) => {
  return (req, res, next) => cb(req, res, next).catch(next);
};

// POST /homeowners
router.post("/api/homeowner", asyncWrapper(addHomeowner));

// GET /homeowners
router.get("/api/homeowners", asyncWrapper(getHomeowners));

// GET /homeowners/:id
router.get("/api/homeowner/:id", asyncWrapper(getHomeownerById));

// GET /homeowners/param/search?fname=value&lname=value
router.get("/api/homeowners/param/search", asyncWrapper(searchHomeowners));

// PUT /homeowners
router.put("/api/homeowner", asyncWrapper(updateHomeowner));

// DELETE /homeowners
router.delete("/api/homeowners", asyncWrapper(deleteHomeowners));

// DELETE /homeowners/:id
router.delete("/api/homeowner/:id", asyncWrapper(deleteHomeownerById));

export default router;
