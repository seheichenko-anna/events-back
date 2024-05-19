import Event from "../models/Event.js";
import Participant from "../models/Participant.js";

export const listEvents = ({ filter = {}, fields, setting = {} }) =>
  Event.find(filter, fields, setting);

export const getEvent = (filter) => Event.findOne(filter);

export const getParticipant = (filter) => Participant.findOne(filter);

export const listParticipants = ({ filter = {}, fields, setting = {} }) =>
  Participant.find(filter, fields, setting).populate("event_id");

export const addParticipant = (data) => Participant.create(data);
