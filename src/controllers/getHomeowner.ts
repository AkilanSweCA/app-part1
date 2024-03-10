import * as express from "express";
import {
  gethomeownerById,
  gethomeowner,
  searchhomeownerByParameters,
} from "../services";
import { globalConstant } from "../utils";
import { StatusCodes } from "../enum/StatusCodes";
import { ISearchHomeowner } from "../interfaces";

export const getHomeowners = async (
  req: express.Request,
  res: express.Response
) => {
  return res.status(StatusCodes.OK).json(await gethomeowner());
};

export const getHomeownerById = async (
  req: express.Request,
  res: express.Response
) => {
  const resp = await gethomeownerById(req.params._id);
  return resp
    ? res.status(StatusCodes.OK).json(resp)
    : res
        .status(StatusCodes.NotFound)
        .json(globalConstant.home_owner.not_found);
};

export const searchHomeowners = async (
  req: express.Request,
  res: express.Response
) => {
  const searchParams = req.query as Partial<ISearchHomeowner>;

  if (Object.keys(searchParams).length === 0) {
    return res
      .status(StatusCodes.BadRequest)
      .json(globalConstant.home_owner.invalidReq);
  }

  const resp = await searchhomeownerByParameters(searchParams);
  return resp.length > 0
    ? res.status(StatusCodes.OK).json(resp)
    : res
        .status(StatusCodes.NotFound)
        .json(globalConstant.home_owner.not_found);
};
