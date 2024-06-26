import * as eventsService from "../services/eventsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import moment from "moment";

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

  const formattedResult = result.map((event) => ({
    ...event.toObject(),
    event_date: moment(event.event_date).format("ddd MMM DD YYYY"),
  }));

  res.json(formattedResult);
};

const getOneEvent = async (req, res) => {
  const _id = req.params.id;
  const result = await eventsService.getEvent({ _id });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const getParticipants = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const event_id = req.params.id;

  const skip = (page - 1) * limit;
  const setting = { skip, limit };

  let filter = { event_id };
  if (search) {
    filter.$or = [
      { email: { $regex: search, $options: "i" } },
      { full_name: { $regex: search, $options: "i" } },
    ];
  }

  const result = await eventsService.listParticipants({
    filter,
    setting,
  });
  res.json(result);
};

const createParticipant = async (req, res) => {
  const event_id = req.params.id;

  const { email } = req.body;

  const existingParticipant = await eventsService.getParticipant({
    email,
    event_id,
  });
  if (existingParticipant) {
    throw HttpError(
      409,
      "Participant with this email is already registered for the event"
    );
  }

  const result = await eventsService.addParticipant({ ...req.body, event_id });
  res.status(201).json(result);
};

export default {
  getAllEvents: ctrlWrapper(getAllEvents),
  getOneEvent: ctrlWrapper(getOneEvent),
  createParticipant: ctrlWrapper(createParticipant),
  getParticipants: ctrlWrapper(getParticipants),
};
