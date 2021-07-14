import express, { Request, Response } from "express";
import { Meeting } from "./meetings.interface";
import {
  scheduleMeeting,
  meetingsSameDate,
  deleteMeeting,
} from "./meetings.service";

export const meetingsRouter = express.Router();

meetingsRouter.post("/date", async (req: Request, res: Response) => {
  const selectedDate: Date = req.body.date;
  await meetingsSameDate(selectedDate)
    .then((meetingOnThisDay: Meeting[]) =>
      res.status(200).send(meetingOnThisDay)
    )
    .catch((err) => res.status(500).json({ err: true, msg: err.message }));
});

meetingsRouter.post("/add", async (req: Request, res: Response) => {
  const newMeeting: Meeting = req.body;
  await scheduleMeeting(newMeeting)
    .then((success: Meeting) => res.status(201).json(success))
    .catch((err) => res.status(500).json({ err: true, msg: err.message }));
});

meetingsRouter.delete("/delete/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  await deleteMeeting(_id)
    .then(() => res.status(201).json({ err: false, _id }))
    .catch((err) => res.status(500).json({ err: true, msg: err.message }));
});
