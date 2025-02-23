import express from "express";
import {
  loginUserController,
  refreshTokenController,
  logoutUserController,
  verifyUserOTPController,
  registerIndividualUserController,
  registerCorporateUserController,
} from "../controllers/auth.controller";
const router = express.Router();

router.route("/register-individual").post(registerIndividualUserController);
router.route("/register-corporate").post(registerCorporateUserController);
router.route("/register/verify-otp").post(verifyUserOTPController);
router.route("/sign-in").post(loginUserController);
router.route("/refresh-token").get(refreshTokenController);
router.route("/logout").get(logoutUserController);

export default router;
