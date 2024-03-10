import * as express from "express";
import { deletehomeowners, deletehomeownerById } from "../services";
import { globalConstant } from "../utils";
import { StatusCodes } from "../enum/StatusCodes";

export const deleteHomeowners = async (
  req: express.Request,
  res: express.Response
) => {
  if (!(req.body.homeowner && req.body.homeowner?._id.length)) {
    return res
      .status(StatusCodes.BadRequest)
      .json(globalConstant.home_owner.invalidReq);
  }
  const resp = await deletehomeowners(req.body.homeowner._id);

  return resp.deletedCount > 0
    ? res.status(StatusCodes.OK).json(globalConstant.home_owner.deleted_all)
    : res
        .status(StatusCodes.NotFound)
        .json(globalConstant.home_owner.not_found);
};

export const deleteHomeownerById = async (
  req: express.Request,
  res: express.Response
) => {
  const resp = await deletehomeownerById(req.params._id);

  return resp
    ? res.status(StatusCodes.OK).json(globalConstant.home_owner.deleted)
    : res
        .status(StatusCodes.NotFound)
        .json(globalConstant.home_owner.not_found);
};
