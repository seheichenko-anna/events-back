import Joi from "joi";

import { emailRegexp, eventSource } from "../constants/user-constants.js";

export const regSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  date_of_birth: Joi.string().required(),
  event_source: Joi.string()
    .required()
    .valid(...eventSource),
});
