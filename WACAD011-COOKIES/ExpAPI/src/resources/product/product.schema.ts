import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  stockQuantity: Joi.number().integer().min(0).required(),
});
