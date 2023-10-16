import { Router } from "express";
import { cryptoRouter } from "./cryptoRouter";

export const appRouter = Router();

appRouter.use("/crypto", cryptoRouter);
