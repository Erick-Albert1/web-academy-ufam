import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema } from "joi";

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        message: "Validation error",
        details: error.details.map((detail) => detail.message),
      });
      return;
    }

    next();
  };
