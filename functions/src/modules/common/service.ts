import { Response } from "express";
import { response_status_codes } from "./model";

export const successResponse = (message: string, data: any, res: Response) => {
  res.status(response_status_codes.success).json({
    status: "success",
    message,
    data,
  });
};

export const failureResponse = (message: string, data: any, res: Response) => {
  res.status(response_status_codes.success).json({
    status: "failure",
    message,
    data,
  });
};

export const insufficientParameters = (res: Response) => {
  res.status(response_status_codes.bad_request).json({
    status: "failure",
    message: "Insufficient parameters",
    data: {},
  });
};

export const methodNotAllowed = (res: Response) => {
  res.status(response_status_codes.not_implemented).json({
    status: "failure",
    message: "Method not allowed",
    data: {},
  });
};
