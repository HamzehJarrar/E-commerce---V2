import * as authService from "./auth.service.js";
import * as authQuery from "./auth.data.js";

export const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: result,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token: result.token,
        user: result.user,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const confirmEmail = async (req, res) => {
  const email = req.body;
  await authService.confirmEmail(email);
  res.status(200).json({ message: "Email confirmed successfully" });
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await authQuery.findUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
