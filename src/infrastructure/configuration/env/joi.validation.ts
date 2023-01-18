import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB_URL: Joi.required(),
  SECRET_KEY: Joi.required(),
});
