import { Schema, model } from "mongoose";
import { Meeting } from "./meetings.interface";

const meetingSchema = new Schema<Meeting>({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Number,
    required: true,
  },
  endTime: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
  },
  manager: {
    _id: String,
    type: Schema.Types.ObjectId,
    ref: "Manager",
  },
});

meetingSchema.pre("save", function (next) {
  const colors = ["ffac81", "ff928b", "fec3a6", "efe9ae", "cdeac0"];
  this.color = colors[Math.floor(Math.random() * colors.length)];
  next();
});

export const Meetings = model<Meeting>("Meeting", meetingSchema);
