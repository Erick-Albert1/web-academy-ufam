import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: req.t("auth.required") });
    return;
  }

  next();
};
