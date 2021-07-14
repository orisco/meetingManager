import { Manager } from "../managers/managers.interface";

export interface Meeting {
  _id: string;
  date: Date;
  startTime: string;
  endTime: string;
  managers: Manager[];
}
