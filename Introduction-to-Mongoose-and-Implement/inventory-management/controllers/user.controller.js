const { signupService, findUserByEmail } = require("../services/user.service");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully signed up",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};

/**
 *
 * 1. check if Email and Password are given
 * 2. Load User with email
 * 3. if not user send res
 * 4. compare password
 * 5. if password not correct send res
 * 6. check if user is active
 * 7. if not active send res
 * 8. send user and token
 */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        status: "Fail",
        error: "Please Provide Your Credential.",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: "Fail",
        error: "No User Found. Please Create an account",
      });
    }

    const isPasswordValid = user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        status: "Fail",
        error: "Password is not Correct",
      });
    }

    if (user.status !== "active") {
      return res.status(401).json({
        status: "Fail",
        error: "Your account is not active yet",
      });
    }

    const token = generateToken(user);
    res.status(200).json({
      status: "success",
      message: "Successfully Logged in",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
