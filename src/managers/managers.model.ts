import { Schema, model } from "mongoose";
import { Manager } from "./managers.interface";

const managerSchema = new Schema<Manager>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export const Managers = model<Manager>("Manager", managerSchema);
