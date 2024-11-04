import { Router } from "express";
import { authmiddleware } from "../middleware";

const router = Router();

// router.post("/zap", authmiddleware, (req, res) => {
//   res.send("zap");
// });

export const zapRouter = router;
