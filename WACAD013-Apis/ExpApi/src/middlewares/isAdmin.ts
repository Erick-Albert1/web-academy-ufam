import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: req.t("auth.required") });
    return;
  }

  if (req.session.userType !== "admin") {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: req.t("auth.forbidden") });
    return;
  }

  next();
};
