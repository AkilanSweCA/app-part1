import { Request, Response, NextFunction } from "express";
export const asyncWrapper = (cb) => {
  return (req: Request, res: Response, next: NextFunction) =>
    cb(req, res, next).catch(next);
};
