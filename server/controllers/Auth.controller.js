const { validationResult } = require("express-validator");
const { createUser } = require("../services/Auth.service");
const User = require("../models/Auth.model");
const Token = require("../models/Token.model");
const { mail } = require("../utils/sendEmail");
const crypto = require("crypto");
const { oauth2client } = require("./../utils/googleConfig");
const axios = require("axios");

async function register(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const user = await createUser(name, email, password);
    const mail_token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    }).save();
    const url = `${process.env.FRONTEND_URL}/api/auth/${user._id}/verify-email/${mail_token.token}`;
    const html = `<h1 align="center">Verify Email</h1><p align="center">Click <a href="${url}">here</a> to verify your email</p>`;
    await mail(user.email, "Verify Email", html);
    res.status(201).json({
      success: true,
      message: "An Email sent to your account please verify",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    if (!user.verified) {
      let mail_token = await Token.findOne({ userId: user._id });
      if (!mail_token) {
        mail_token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(16).toString("hex"),
        }).save();
      }
      const url = `${process.env.FRONTEND_URL}/api/auth/${user._id}/verify-email/${mail_token.token}`;
      const html = `<h1 align="center">Verify Email</h1><p align="center">Click <a href="${url}">here</a> to verify your email</p>`;
      await mail(user.email, "Verify Email", html);
      return res.status(200).json({
        success: true,
        message:
          "Email not verified, an email sent to your account please verify",
        isVerified: false,
      });
    }
    const token = user.generateAuthToken();
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
      isVerified: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function googleLogin(req, res) {
  try {
    const { code } = req.query;
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name } = userRes.data;
    let user = await User.findOne({ email });
    if (!user) {
      user = await new User({
        name,
        email,
        password: await User.hashPassword("password"),
        verified: true,
      });
      await user.save();
    }
    const token = user.generateAuthToken();
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
      isVerified: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function getProfile(req, res) {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function forgotPassword(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.verified) {
      return res
        .status(400)
        .json({ success: false, message: "Email not verified" });
    }
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
    }).save();
    const url = `${process.env.FRONTEND_URL}/api/auth/${user._id}/reset-password/${token.token}`;
    const html = `<h1 align="center">Reset Password</h1><p align="center">Click <a href="${url}">here</a> to reset your password</p>`;
    await mail(user.email, "Reset Password", html);
    res
      .status(200)
      .json({ success: true, message: "Email sent to your account" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function resetPassword(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }
    await User.findByIdAndUpdate(user._id, {
      password: await User.hashPassword(req.body.password),
    });
    await Token.findByIdAndDelete(token._id);
    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function verifyEmail(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }
    await User.findByIdAndUpdate(user._id, { verified: true });
    await Token.findByIdAndDelete(token._id);
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

module.exports = {
  register,
  login,
  getProfile,
  verifyEmail,
  forgotPassword,
  resetPassword,
  googleLogin,
};
