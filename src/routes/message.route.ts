import express, { Request, Response, NextFunction } from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller";

const router = express.Router();

router.get(
  "/users",
  (req: Request, res: Response, next: NextFunction) => {
    protectRoute(req, res, next);
  },
  getUsersForSidebar
);
router.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    protectRoute(req, res, next);
  },
  getMessages
);
router.post(
  "/send/:id",
  (req: Request, res: Response, next: NextFunction) => {
    protectRoute(req, res, next);
  },
  sendMessage
);

export default router;
