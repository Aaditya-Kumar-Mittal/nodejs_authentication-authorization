// register controller, login controller

const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    // Extract the user details from the request
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists. Please login or use different credentials.",
      });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Save the new user
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Registration Error: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
