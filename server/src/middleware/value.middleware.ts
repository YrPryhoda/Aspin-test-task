import { NextFunction, Request, Response } from "express";

export const valueValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  if (!body.amount || !body.date) {
    return res.status(400).send({ message: "Invalid body" });
  }

  next();
};
