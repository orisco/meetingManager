import express, { Request, Response } from "express";
import { Manager } from "./managers.interface";

export const managersRouter = express.Router();
import { addManager, getAllManagers, deleteManager } from "./managers.service";

managersRouter.get("/", async (req: Request, res: Response) => {
  await getAllManagers()
    .then((allManagers) => res.status(201).json(allManagers))
    .catch((err) => res.status(500).send({ err: true, msg: err.message }));
});

managersRouter.post("/add", async (req: Request, res: Response) => {
  const manager: Manager = req.body;
  await addManager(manager)
    .then((newManager) => res.status(201).json(newManager))
    .catch((err) => res.status(500).json({ err: true, msg: err.message }));
});

managersRouter.delete("/delete/:_id", async (req: Request, res: Response) => {
  const { _id } = req.params;
  await deleteManager(_id)
    .then(() => res.status(201).json({ _id }))
    .catch((err) => res.status(500).json({ err: true, msg: err.message }));
});
