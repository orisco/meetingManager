import { Meetings } from "./meetings.model";
import { Meeting } from "./meetings.interface";

export const meetingsSameDate = async (date: Date): Promise<Meeting[]> => {
  const meetingOnThisDay = Meetings.find({ date: date })
    .sort({ startTime: "asc" })
    .populate("manager")
    .exec();
  return meetingOnThisDay;
};

export const scheduleMeeting = async (
  newMeeting: Meeting
): Promise<Meeting> => {
  const addMeeting = new Meetings(newMeeting);
  const scheduledMeeting = addMeeting.save();
  return scheduledMeeting;
};

export const deleteMeeting = async (_id: string): Promise<void> => {
  Meetings.deleteOne({ _id: _id }).exec((err, deleted) => {
    if (err) return err;
    return _id;
  });
};
