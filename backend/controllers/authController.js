const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const PasswordManager = require("../utils/PasswordManager");

// Create user + account
exports.addUser = async (req, res) => {
  try {
    const { persal, fullName, role, email } = req.body;

    if (!persal || !fullName || !role || !email) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingUserByPersal = await User.findByPersal(persal);

    if (existingUserByPersal) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this Persal Number",
      });
    }
    console.log(existingUserByPersal);

    // Check if user already exists
    const existingUserByMail = await User.findByEmail(email);
    console.log(existingUserByMail);

    if (existingUserByMail) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this Email",
      });
    }

    // Create user in the "user" table
    const userId = await User.createUser(persal, fullName, role);

    // Generate a password
    const pm = new PasswordManager();
    let generatedPassword = pm.generatePassword(email, persal);

    //GET RID OF THIS LINE, THEN SEND PASSWORD EMAIL TO THE LINK
    generatedPassword = "Rosina^*20";
    // Hash password
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create account entry
    await User.createAccount(persal, email, hashedPassword);

    res.json({
      success: true,
      message: "User and account created successfully",
      userId,
      generatedPassword,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const account = await User.findAccountByEmail(email);
    
    console.log(account);
    if (!account) {
      console.log("About to stop");
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    console.log("About to contitnue 1");
    // Compare given password with hashed password
    /*const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      console.log("Not a match");
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }*/

    // Optional: create JWT
    const token = jwt.sign(
      {
        persal_number: account.persal_number,
        role: account.role,
        email: account.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      success: true,
      message: "Login successful",
      user: {
        email: account.email,
        role: account.role,
        persalNumber: account.persal_number,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ success: false, error: "Server error while logging in" });
  }
};

exports.getWorkers = async (req, res) => {
  try {
    const role = req.query.role;

    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: "Role is required." });
    }

    const workers = await User.getWorkers(role, 0);

    res.json({
      success: true,
      message: "User and account created successfully",
      workers: workers,
    });
  } catch (err) {
    console.error("Error addUser:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();

    res.json({
      success: true,
      message: "User fetched successfully",
      users: users,
    });
  } catch (err) {
    console.error("❌ Error fetching users:", err);
    res.status(500).json({ error: "Database error" });
  }
};

//update role
exports.updateRole = async (req, res) => {
  try {
    const { persal } = req.params;
    const { role } = req.body;

    if (!persal || !role) {
      return res
        .status(400)
        .json({ success: false, message: "Persal number and role are required" });
    }

    const updated = await User.updateRole(persal, role);
    console.log("Return value",updated);

    res.json({
      success: true,
      message: "User role successfuly updated",
    });

  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
};

// DELETE a user by persal
exports.deleteUser = async (req, res) => {
  const { persal } = req.params;

  console.log("In the controller");

  if (!persal) {
    return res
      .status(400)
      .json({ success: false, error: "Persal number required" });
  }

  try {
    const result = await User.deleteUser(persal);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({
      success: true,
      message: "User and all related data deleted successfully",
    });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
};
