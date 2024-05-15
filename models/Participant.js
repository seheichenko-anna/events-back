import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const participantSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    eventSource: {
      type: String,
      enum: ["social media", "friends", "found myself"],
      default: null,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
  },
  { versionKey: false }
);

participantSchema.pre("findOneAndUpdate", setUpdateSetting);
participantSchema.post("save", handleSaveError);
participantSchema.post("findOneAndUpdate", handleSaveError);

const Participant = model("participant", participantSchema);

export default Participant;
