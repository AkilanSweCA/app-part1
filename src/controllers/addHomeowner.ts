import * as express from "express";
import { addhomeowner, fetchAdditionalInfo } from "../services";
import {
  globalConstant,
  parseHomeownerRequest,
  validateHomeownerCreateReq,
} from "../utils";
import { StatusCodes } from "../enum/StatusCodes";

export const addHomeowner = async (
  req: express.Request,
  res: express.Response
) => {
  // Parse XML document
  const obj = parseHomeownerRequest(req);

  if (validateHomeownerCreateReq(obj)) {
    return res.sendStatus(400);
  }

  const additionalInfo = await fetchAdditionalInfo(obj);
  const resp = await addhomeowner({ ...obj, ...additionalInfo });

  return resp
    ? res.status(StatusCodes.Created).json(resp)
    : res
        .status(StatusCodes.BadRequest)
        .json(globalConstant.home_owner.already_exists);
};
