import express from "express";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import { regSchema } from "../schemas/regSchemas.js";
import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import eventsControllers from "../controllers/eventsControllers.js";

const eventsRouter = express.Router();

eventsRouter.get("/", eventsControllers.getAllEvents);

eventsRouter.get(
  "events/:id/participants",
  isValidId,
  eventsControllers.getParticipants
);

eventsRouter.post(
  "/events/:id/register",
  isEmptyBody,
  validateBody(regSchema),
  eventsControllers.createParticipant
);

export default eventsRouter;
