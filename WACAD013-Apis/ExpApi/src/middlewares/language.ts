import { Request, Response, NextFunction } from "express";
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  translate,
} from "../i18n/messages";

const isSupportedLanguage = (value: unknown): value is SupportedLanguage =>
  typeof value === "string" &&
  SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);

export const language = (req: Request, res: Response, next: NextFunction) => {
  const cookieLang = req.cookies?.lang;
  const lang = isSupportedLanguage(cookieLang) ? cookieLang : DEFAULT_LANGUAGE;

  req.lang = lang;
  req.t = (key) => translate(lang, key);

  next();
};
