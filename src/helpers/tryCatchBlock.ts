import { NextFunction } from "express";

export default (fn: Function, next: NextFunction) => {
  try {
    fn().catch((e: Error) => {
      throw e;
    });
  } catch (e) {
    if (next === null) {
      throw e;
    }
    next(e);
  }
};
