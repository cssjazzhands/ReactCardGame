import { Router, Request, Response } from "express";
import { CRITTERS } from "utils/critters-data";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(CRITTERS);
});

router.get("/:id", (req: Request, res: Response) => {
  const critter = CRITTERS.find((m) => m.id === req.params.id);
  if (!critter) {
    res.status(404).json({ error: "Critter not found" });
    return;
  }
  res.json(critter);
});

export default router;
