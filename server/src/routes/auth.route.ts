import express from "express";
import {
  //   registerUserController,
  loginUserController,
  //   refreshTokenController,
  //   logoutUserController,
} from "../controllers/auth.controller";
const router = express.Router();

// router.route("/register").post(registerUserController);
router.route("/sign-in").post(loginUserController);
// router.route("/refresh-token").get(refreshTokenController);
// router.route("/logout").get(logoutUserController);

export default router;
