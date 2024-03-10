import * as express from "express";
import { createhomeowner, fetchadditionalinfo } from "../services";
import { globalConstant, validateHomeownerCreateReq } from "../utils";
import { StatusCodes } from "../enum/StatusCodes";
import { ICreateHomeowner } from "../interfaces";

export const createHomeowner = async (
  req: express.Request,
  res: express.Response
) => {
  // Parse XML document
  const obj: ICreateHomeowner = req.body.homeowner;

  if (validateHomeownerCreateReq(obj)) {
    return res
      .status(StatusCodes.BadRequest)
      .json(globalConstant.home_owner.invalidReq);
  }

  const additionalInfo = await fetchadditionalinfo(obj);
  const resp = await createhomeowner({ ...obj, ...additionalInfo });

  return resp
    ? res.status(StatusCodes.Created).json(resp)
    : res
        .status(StatusCodes.BadRequest)
        .json(globalConstant.home_owner.already_exists);
};
