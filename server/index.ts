import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { appRouter } from "./src/router";
import { mongoConnect } from "./src/modules/mongo";

dotenv.config();
const app = express();
const APP_PORT = process.env.APP_PORT || 3005;

app.use(express.json());
app.use(cors());
app.use("/api", appRouter);

mongoConnect()
  .then(() => {
    app.listen(APP_PORT, () => {
      console.log(`Server is running on port ${APP_PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
