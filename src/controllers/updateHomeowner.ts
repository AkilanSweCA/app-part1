import * as express from "express";
import { fetchadditionalinfo, updatehomeowner } from "../services";
import { globalConstant, validateHomeownerUpdateReq } from "../utils";
import { StatusCodes } from "../enum/StatusCodes";
import { ICreateHomeowner } from "../interfaces";

export const updateHomeowner = async (
  req: express.Request,
  res: express.Response
) => {
  // Parse XML document
  const obj: ICreateHomeowner = req.body.homeowner;

  if (!validateHomeownerUpdateReq(obj)) {
    return res
      .status(StatusCodes.BadRequest)
      .json(globalConstant.home_owner.invalidReq);
  }

  const additionalInfo = await fetchadditionalinfo(obj);
  const resp = await updatehomeowner({ ...obj, ...additionalInfo });

  return resp
    ? res.status(StatusCodes.OK).json(resp)
    : res
        .status(StatusCodes.NotFound)
        .json(globalConstant.home_owner.not_found);
};
