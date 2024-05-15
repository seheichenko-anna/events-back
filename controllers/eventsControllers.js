import * as eventsService from "../services/eventsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllEvents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;
  const setting = { skip, limit };

  const result = await eventsService.listEvents({
    setting,
  });
  res.json(result);
};

export default {
  getAllEvents: ctrlWrapper(getAllEvents),
};
