import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { SUPPORTED_LANGUAGES, SupportedLanguage, translate } from "../../i18n/messages";

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const update = (req: Request, res: Response) => {
  const code = req.params.code as SupportedLanguage;

  if (!SUPPORTED_LANGUAGES.includes(code)) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: req.t("language.invalid") });
    return;
  }

  res.cookie("lang", code, { maxAge: ONE_YEAR_MS, httpOnly: true });
  res.status(StatusCodes.OK).json({ message: translate(code, "language.updated") });
};

export const idiomaController = {
  update,
};
