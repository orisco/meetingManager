// External Imports
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Internal Imports
import { meetingsRouter } from "./meetings/meetings.router";
import { managersRouter } from "./managers/managers.router";
import { connect } from "mongoose";

dotenv.config();
const app = express();

// MongoDB Connect
connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((error) => {
  console.log(`connection error ${error}`);
});

// Cors Configuration
let corsOptions = {
  origin: process.env.FRONT_END,
};

// App Configuration
app.use(cors(corsOptions));
app.use(express.json());

// Routes Configuration
app.use("/api/meetings", meetingsRouter);
app.use("/api/managers", managersRouter);

app.listen(process.env.PORT, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
