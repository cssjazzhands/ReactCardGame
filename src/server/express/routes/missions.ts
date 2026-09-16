import { Router, Request, Response } from "express";
import { MISSIONS } from "utils/missions-data";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(MISSIONS);
});

router.get("/:id", (req: Request, res: Response) => {
  const mission = MISSIONS.find((m) => m.id === req.params.id);
  if (!mission) {
    res.status(404).json({ error: "Mission not found" });
    return;
  }
  res.json(mission);
});

export default router;
