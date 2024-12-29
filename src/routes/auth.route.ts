import express, { Request, Response, NextFunction } from "express";
import {
  signup,
  login,
  logout,
  updateProfilePic,
  checkUser,
} from "../controllers/auth.controller";
import { protectRoute } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  signup(req, res);
});
router.post("/login", (req: Request, res: Response) => {
  login(req, res);
});
router.post("/logout", (req: Request, res: Response) => {
  logout(req, res);
});
router.put(
  "/update-profile-image",
  (req: Request, res: Response, next: NextFunction) => {
    protectRoute(req, res, next);
  },
  (req: Request, res: Response) => {
    updateProfilePic(req, res);
  }
);
router.get(
  "/check",
  (req: Request, res: Response, next: NextFunction) => {
    protectRoute(req, res, next);
  },
  (req: Request, res: Response) => {
    checkUser(req, res);
  }
);

export default router;
