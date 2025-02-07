const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleLogin,
} = require("../controllers/Auth.controller");
const { body } = require("express-validator");
const { auth } = require("../middlewares/Auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
  ],
  register
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  login
);
router.get("/profile", auth, getProfile);
router.get("/:id/verify-email/:token", verifyEmail);
router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Invalid email")],
  forgotPassword
);
router.post(
  "/:id/reset-password/:token",
  [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  resetPassword
);
router.get("/google/callback", googleLogin);

module.exports = router;
