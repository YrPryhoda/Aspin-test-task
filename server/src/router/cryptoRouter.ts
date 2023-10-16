import { Router } from "express";
import { coinService } from "../services/coin.service";
import { coinValidation } from "../middleware/coin.middleware";
import { valueValidation } from "../middleware/value.middleware";

export const cryptoRouter = Router();

cryptoRouter
  .get("/all", async (req, res) => {
    try {
      const coins = await coinService.all();

      return res.send(coins);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const coin = await coinService.byId(id);

      return res.send(coin);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .post("/", coinValidation, async (req, res) => {
    try {
      const newCoin = await coinService.create(req.body);

      return res.send(newCoin);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .post("/:coinId", valueValidation, async (req, res) => {
    const coinId = req.params.coinId;
    const newCoin = req.body;

    try {
      const result = await coinService.addValue(coinId, newCoin);
      return res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .delete("/:coinId/:valueId", async (req, res) => {
    const coinId = req.params.coinId;
    const valueId = req.params.valueId;

    try {
      const result = await coinService.deleteValue(coinId, valueId);

      res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  });
