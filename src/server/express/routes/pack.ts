import { Router, Request, Response } from "express";
import { getRandomItems } from "utils/utils";
import { CRITTERS } from "utils/critters-data";

const router = Router();
const version = 1;

router.get("/", (_req: Request, res: Response) => {
  // return an example pack
  const packContents = getRandomItems(CRITTERS, 3);
  if (!packContents || packContents.length === 0) {
    res.status(404).json({ error: "No available packs" });
    return;
  }
  res.json({version: version, result: packContents});
});

//TODO: Check user ID to make sure they have access to a new pack
router.get("/:amount", (req: Request, res: Response) => {
  const amount = Number(req.params.amount);
  if (isNaN(amount)) {
    res.status(400).send("ID must be a number");
    return;
  }

  const packContents = getRandomItems(CRITTERS, amount);
  if (!packContents || packContents.length === 0) {
    res.status(404).json({ error: "No available packs" });
    return;
  }
  res.json({version: version, result: packContents});
});

export default router;
