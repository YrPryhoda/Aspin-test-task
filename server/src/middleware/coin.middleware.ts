import { NextFunction, Request, Response } from "express";
import { coinService } from "../services/coin.service";

export const coinValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  const trim = (value: string) => value && value.trim();

  if (!trim(body.title) || !trim(body.image)) {
    return res.status(400).send({ message: "Invalid body" });
  }

  try {
    const isExist = await coinService.byName(body.title);

    if (isExist) {
      return res.status(409).send({ message: `${body.title} already exists` });
    }
  } catch (error) {
    const err = error as Error;
    return res.status(400).send({ message: err.message });
  }

  next();
};
