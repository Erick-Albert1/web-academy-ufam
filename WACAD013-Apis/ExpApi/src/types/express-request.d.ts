import { MessageKey, SupportedLanguage } from "../i18n/messages";

declare global {
  namespace Express {
    interface Request {
      lang: SupportedLanguage;
      t: (key: MessageKey) => string;
    }
  }
}

export {};
