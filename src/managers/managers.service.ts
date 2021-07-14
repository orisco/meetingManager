import { Managers } from "./managers.model";
import { Manager } from "./managers.interface";
import { Meetings } from "../meetings/meetings.model";

export const getAllManagers = async (): Promise<Manager[]> => {
  const allManagers = Managers.find();
  return allManagers;
};

export const addManager = async (newManager: Manager): Promise<Manager> => {
  const addManager = new Managers(newManager);
  const addedManager = addManager.save();
  return addedManager;
};

export const deleteManager = async (_id: string): Promise<void> => {
  Managers.deleteOne({ _id }).exec((err, deleted) => {
    if (err) return err;
    Meetings.deleteMany({ manager: _id }).exec((err, deleted) => {
      if (err) return err;
    });
    return _id;
  });
};
