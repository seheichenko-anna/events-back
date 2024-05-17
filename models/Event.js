import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const eventSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    event_date: {
      type: Date,
    },
    organizer: {
      type: String,
    },
  },
  { versionKey: false }
);

eventSchema.pre("findOneAndUpdate", setUpdateSetting);
eventSchema.post("save", handleSaveError);
eventSchema.post("findOneAndUpdate", handleSaveError);

const Event = model("event", eventSchema);

export default Event;
