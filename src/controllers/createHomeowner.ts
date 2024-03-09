import * as express from "express";
import { createhomeowner, fetchadditionalinfo } from "../services";
import {
  globalConstant,
  parseHomeownerRequest,
  validateHomeownerCreateReq,
} from "../utils";
import { StatusCodes } from "../enum/StatusCodes";

export const createHomeowner = async (
  req: express.Request,
  res: express.Response
) => {
  // Parse XML document
  const obj = parseHomeownerRequest(req);

  if (validateHomeownerCreateReq(obj)) {
    return res.sendStatus(400);
  }

  const additionalInfo = await fetchadditionalinfo(obj);
  const resp = await createhomeowner({ ...obj, ...additionalInfo });

  return resp
    ? res.status(StatusCodes.Created).json(resp)
    : res
        .status(StatusCodes.BadRequest)
        .json(globalConstant.home_owner.already_exists);
};
