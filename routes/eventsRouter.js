import express from "express";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import { regSchema } from "../schemas/regSchemas.js";
import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import eventsControllers from "../controllers/eventsControllers.js";

const eventsRouter = express.Router();

eventsRouter.get("/", eventsControllers.getAllEvents);

eventsRouter.get(
  "/:id/participants",
  isValidId,
  eventsControllers.getParticipants
);

eventsRouter.post(
  "/:id/registration",
  isEmptyBody,
  validateBody(regSchema),
  isValidId,
  eventsControllers.createParticipant
);

export default eventsRouter;
