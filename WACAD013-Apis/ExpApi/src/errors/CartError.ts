import { MessageKey } from "../i18n/messages";

export class CartError extends Error {
  key: MessageKey;

  constructor(key: MessageKey) {
    super(key);
    this.key = key;
  }
}
