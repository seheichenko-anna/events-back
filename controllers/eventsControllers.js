import * as eventsService from "../services/eventsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllEvents = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "event_date",
    order = "asc",
  } = req.query;

  const skip = (page - 1) * limit;
  const setting = { skip, limit, sort: { [sortBy]: order === "asc" ? 1 : -1 } };

  const result = await eventsService.listEvents({
    setting,
  });
  res.json(result);
};

const getOneEvent = async (req, res) => {
  const event_id = req.params.id;
  const result = await eventsService.getEvent({ event_id });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const getParticipants = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const event_id = req.params.id;

  const skip = (page - 1) * limit;
  const setting = { skip, limit };

  const result = await eventsService.listParticipants({
    event_id,
    setting,
  });
  res.json(result);
};

const createParticipant = async (req, res) => {
  const event_id = req.params.id;
  const result = await eventsService.addParticipant({ ...req.body, event_id });
  res.status(201).json(result);
};

export default {
  getAllEvents: ctrlWrapper(getAllEvents),
  getOneEvent: ctrlWrapper(getOneEvent),
  createParticipant: ctrlWrapper(createParticipant),
  getParticipants: ctrlWrapper(getParticipants),
};
