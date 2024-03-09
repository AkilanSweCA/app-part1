import * as express from "express";
import { fetchadditionalinfo, updatehomeowner } from "../services";
import {
  globalConstant,
  parseHomeownerRequest,
  validateHomeownerUpdateReq,
} from "../utils";
import { StatusCodes } from "../enum/StatusCodes";

export const updateHomeowner = async (
  req: express.Request,
  res: express.Response
) => {
  // Parse XML document
  const obj = parseHomeownerRequest(req);

  if (!obj._id || !validateHomeownerUpdateReq(obj)) {
    return res.sendStatus(StatusCodes.BadRequest);
  }

  const additionalInfo = await fetchadditionalinfo(obj);
  const resp = await updatehomeowner({ ...obj, ...additionalInfo });

  return resp == null
    ? res.status(StatusCodes.OK).json(resp)
    : res
        .status(StatusCodes.NotFound)
        .json(globalConstant.home_owner.not_found);
};
